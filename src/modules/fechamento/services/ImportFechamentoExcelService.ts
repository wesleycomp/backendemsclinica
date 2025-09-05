// src/modules/fechamento/services/ImportFechamentoExcelService.ts
import ExcelJS, { Worksheet } from 'exceljs';
import { getManager, getRepository, ILike, Repository } from 'typeorm';

// ========= AJUSTE OS CAMINHOS CONFORME SUA ÁRVORE =========
import Empresa from '@modules/empresa/typeorm/entities/Empresa';
import Paciente from '@modules/paciente/typeorm/entities/Paciente';
import Aso from '@modules/aso/typeorm/entities/Aso';
import Exame from '@modules/exame/typeorm/entities/Exame';
import ExameAso from '@modules/aso/typeorm/entities/ExamesAso';
// ===========================================================

const CONVENIO_TIPOPAGAMENTO_ID = '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a';
const RESULTADO_OK = 'APTO' as unknown as Aso['resultado'];

type ImportArgs = {
  file: Buffer;
  filename?: string;
  empresaId?: string;
  empresaCnpj?: string;
  allowCreateEmpresaIfMissing?: boolean;
  allowCreatePacienteIfMissing?: boolean;
  allowUnknownExam?: boolean;
  dryRun?: boolean;
};

type ImportResult = {
  empresa?: { id: string; nome: string; cnpj: string } | null;
  periodo?: { inicio?: string; fim?: string } | null;
  contagens: {
    pacientesLidos: number;
    pacientesCriados: number;
    asosCriados: number;
    examesCriados: number;
    linhasIgnoradas: number;
  };
  avisos: string[];
  erros: string[];
};

type SheetCompany = {
  cnpj?: string;
  nome?: string;
  periodoInicio?: Date;
  periodoFim?: Date;
};

type ParsedExamRow = {
  pacienteNome?: string;
  pacienteCpf?: string;
  dataExame?: Date;
  tipoAso?: string;
  exameNome?: string;
  valor?: number;
};

export default class ImportFechamentoExcelService {
  private empresaRepo: Repository<Empresa>;
  private pacienteRepo: Repository<Paciente>;
  private asoRepo: Repository<Aso>;
  private exameRepo: Repository<Exame>;
  private exameAsoRepo: Repository<ExameAso>;

  constructor() {
    this.empresaRepo = getRepository(Empresa);
    this.pacienteRepo = getRepository(Paciente);
    this.asoRepo = getRepository(Aso);
    this.exameRepo = getRepository(Exame);
    this.exameAsoRepo = getRepository(ExameAso);
  }

  // ----------------- helpers -----------------
  private onlyDigits(s?: string) { return (s || '').replace(/\D+/g, ''); }

  private parseBrMoney(s?: string): number | undefined {
    if (!s) return;
    const txt = s.replace(/\s|R\$/gi, '').replace(/\./g, '').replace(',', '.');
    const v = Number(txt);
    return Number.isFinite(v) ? v : undefined;
  }

  private parseBrDate(s?: string): Date | undefined {
    if (!s) return;
    const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
    if (!m) return;
    const [_, dd, mm, yyyy] = m;
    return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
  }

  /** Lê conteúdo de célula ExcelJS de forma segura (merge/richText/formula). */
  private cellText(cell: any): string {
    try {
      const v = cell?.value;
      if (v == null) return '';

      if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
        return String(v);
      }
      if (v instanceof Date) {
        const dd = String(v.getDate()).padStart(2, '0');
        const mm = String(v.getMonth() + 1).padStart(2, '0');
        const yyyy = v.getFullYear();
        return `${dd}/${mm}/${yyyy}`;
      }
      if (typeof v === 'object' && Array.isArray((v as any).richText)) {
        return (v as any).richText.map((rt: any) => rt?.text ?? '').join('');
      }
      if ((v as any).text) return String((v as any).text);
      if ((v as any).result != null) return String((v as any).result);
      if (typeof (v as any).toString === 'function') return (v as any).toString();
      return '';
    } catch {
      return '';
    }
  }

  private rowJoin(ws: Worksheet, r: number, maxCols = 30): string {
    const parts: string[] = [];
    const cols = Math.min(ws.columnCount || maxCols, maxCols);
    for (let c = 1; c <= cols; c++) {
      const t = this.cellText(ws.getCell(r, c)).trim();
      if (t) parts.push(t);
    }
    return parts.join(' ');
  }

  private extractCompanyFromFooter(ws: Worksheet): SheetCompany | undefined {
    const norm = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    let anchor = -1;

    for (let r = ws.rowCount; r >= Math.max(1, ws.rowCount - 250); r--) {
      const t = norm(this.rowJoin(ws, r));
      if (t.includes('relatorio de faturamento mensal')) { anchor = r; break; }
    }
    if (anchor === -1) return;

    const out: SheetCompany = {};
    for (let r = anchor; r <= Math.min(ws.rowCount, anchor + 40); r++) {
      const line = this.rowJoin(ws, r);

      if (!out.cnpj && /cnpj/i.test(line)) {
        const m = line.match(/(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})/);
        if (m) out.cnpj = this.onlyDigits(m[1]);
      }
      if (!out.nome && /empresa\s*:/i.test(line)) {
        let txt = line.replace(/^.*?empresa\s*:\s*/i, '').trim();
        const mm = txt.match(/^\d+\s*-\s*(.+)$/);
        out.nome = (mm ? mm[1] : txt).trim();
      }
      if (!out.periodoInicio && /peri[oó]do/i.test(line)) {
        const mm = line.match(/(\d{2}\/\d{2}\/\d{4}).*?(\d{2}\/\d{2}\/\d{4})/);
        if (mm) {
          out.periodoInicio = this.parseBrDate(mm[1]);
          out.periodoFim = this.parseBrDate(mm[2]);
        }
      }
    }

    if (!out.cnpj && !out.nome) return;
    return out;
  }

  private scanExamRows(ws: Worksheet): ParsedExamRow[] {
    const rows: ParsedExamRow[] = [];
    let currentCpf: string | undefined;
    let currentNome: string | undefined;

    const TIPOS = ['Admissional', 'Periódico', 'Periodico', 'Retorno', 'Demissional', 'Mudança de Função', 'Mudanca de Funcao'];
    const moneyRegex = /(^R\$\s*)?\d{1,3}(\.\d{3})*,\d{2}$|^\d+([.,]\d{2})?$/;

    for (let r = 1; r <= ws.rowCount; r++) {
      const parts: string[] = [];
      const cells: string[] = [];
      const cols = Math.max(1, ws.columnCount || 1);

      for (let c = 1; c <= cols; c++) {
        const t = this.cellText(ws.getCell(r, c)).trim();
        cells.push(t);
        if (t) parts.push(t);
      }

      const line = parts.join(' ');
      if (!line) continue;

      // CPF -> “abre” um novo paciente
      const cpfMatch = line.match(/(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/);
      if (cpfMatch) {
        currentCpf = this.onlyDigits(cpfMatch[1]);

        // Tenta "Paciente: NOME"
        let nome: string | undefined;
        const nomePac = line.match(/paciente\s*:\s*([A-Za-zÀ-ú\s']{3,})/i);
        if (nomePac) nome = nomePac[1].trim();
        else {
          // Heurística: texto antes do CPF
          const idx = line.indexOf(cpfMatch[1]);
          if (idx > 0) nome = line.slice(0, idx).replace(/[:\-]/g, ' ').trim();
        }
        currentNome = nome;
        continue;
      }

      // Candidata a linha de exame
      const anyMoney = cells.find(t => moneyRegex.test(t));
      const anyDate  = cells.find(t => /\d{2}\/\d{2}\/\d{4}/.test(t));
      const anyTipo  = cells.find(t => TIPOS.includes(t.trim()));

      if (anyMoney && anyDate) {
        const examName = cells
          .filter(t =>
            t &&
            !/\d{2}\/\d{2}\/\d{4}/.test(t) &&
            !moneyRegex.test(t) &&
            !TIPOS.includes(t))
          .sort((a, b) => b.length - a.length)[0];

        rows.push({
          pacienteNome: currentNome,
          pacienteCpf: currentCpf,
          dataExame: this.parseBrDate(anyDate),
          tipoAso: anyTipo,
          exameNome: examName,
          valor: this.parseBrMoney(anyMoney),
        });
      }
    }

    return rows;
  }

  private async ensureEmpresa(
    rodape: SheetCompany | undefined,
    args: ImportArgs
  ): Promise<Empresa | undefined> {
    // 1) override explícito
    if (args.empresaId) {
      const e = await this.empresaRepo.findOne(args.empresaId);
      if (e) return e;
    }
    if (args.empresaCnpj) {
      const e = await this.empresaRepo.findOne({ where: { cnpj: this.onlyDigits(args.empresaCnpj) } });
      if (e) return e;
    }
    // 2) rodapé
    if (rodape?.cnpj) {
      const e = await this.empresaRepo.findOne({ where: { cnpj: rodape.cnpj } });
      if (e) return e;
    }
    if (rodape?.nome) {
      const e = await this.empresaRepo.findOne({ where: { nome: ILike(rodape.nome) } });
      if (e) return e;
    }
    // 3) criar?
    if ((rodape?.nome || rodape?.cnpj) && (args.allowCreateEmpresaIfMissing ?? true)) {
      const novo: Empresa = this.empresaRepo.create({
        nome: rodape?.nome || 'EMPRESA (import)',
        cnpj: this.onlyDigits(rodape?.cnpj) || '00000000000000',
        esocial: false,
        convenio: true,
      } as Partial<Empresa>) as Empresa;

      if (args.dryRun) return novo;
      return await this.empresaRepo.save(novo);
    }
    return undefined;
  }

  private async getOrCreatePaciente(
    nome: string | undefined,
    cpf: string | undefined,
    empresaId: string | undefined,
    allowCreate: boolean,
  ): Promise<{ pac?: Paciente; created: boolean }> {
    if (!cpf) return { pac: undefined, created: false };

    const found = await this.pacienteRepo.findOne({
      where: { cpf: this.onlyDigits(cpf) },
    });

    if (found) {
      if (!found.empresa_id && empresaId) {
        found.empresa_id = empresaId;
        await this.pacienteRepo.save(found);
      }
      return { pac: found, created: false };
    }

    if (!allowCreate) return { pac: undefined, created: false };

    const now = new Date();
    const novo: Paciente = this.pacienteRepo.create({
      nome: nome || 'PACIENTE (import)',
      cpf: this.onlyDigits(cpf),
      empresa_id: empresaId || null,
      matricula: 'IMPORT',
      dataentradaempresa: now,
      descricaoatividade: 'IMPORTADO',
      rg: 'ISENTO',
      telefone: '00000000000',
      ctps: 'ISENTO',
      datanascimento: new Date(1970, 0, 1),
      email: `import+${this.onlyDigits(cpf)}@local.test`,
    } as Partial<Paciente>) as Paciente;

    const saved: Paciente = await this.pacienteRepo.save(novo);
    return { pac: saved, created: true };
  }

  private async findExameByNome(nome?: string): Promise<Exame | undefined> {
    if (!nome) return undefined;
    return await this.exameRepo.findOne({ where: { nome: ILike(nome.trim()) } });
  }

  // ----------------- principal -----------------
  public async execute(args: ImportArgs): Promise<ImportResult> {
    const avisos: string[] = [];
    const erros: string[] = [];

    // 1) Carrega a planilha
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(args.file);
    const ws = wb.worksheets[0];

    // 2) Empresa + Período (rodapé)
    const rodape = this.extractCompanyFromFooter(ws);
    const empresa = await this.ensureEmpresa(rodape, args);

    if (!empresa) {
      avisos.push('Empresa não identificada nem criada. Vou continuar, mas não vincularei ASO à empresa.');
    }

    // 3) Varre linhas de exames
    const parsed = this.scanExamRows(ws);

    // 4) Agrupa por Paciente + Data (um ASO por data/paciente)
    type Key = string; // `${cpf}|${yyyy-mm-dd}`
    const group = new Map<Key, ParsedExamRow[]>();

    let pacientesLidos = 0;
    let linhasIgnoradas = 0;

    for (const row of parsed) {
      if (!row.pacienteCpf) { linhasIgnoradas++; continue; }
      pacientesLidos++;

      const d = row.dataExame || rodape?.periodoInicio || new Date();
      const key = `${this.onlyDigits(row.pacienteCpf)}|${d.toISOString().slice(0, 10)}`;
      if (!group.has(key)) group.set(key, []);
      group.get(key)!.push(row);
    }

    // 5) Transação para gravar
    let pacientesCriados = 0;
    let asosCriados = 0;
    let examesCriados = 0;

    await getManager().transaction(async trx => {
      for (const rows of Array.from(group.values())) {
        const sample = rows[0];
        const cpf = sample.pacienteCpf;
        const nome = sample.pacienteNome;
        const dataBase = sample.dataExame || rodape?.periodoInicio || new Date();

        // ---------------- Paciente ----------------
        const { pac, created } = await this.getOrCreatePaciente(
          nome,
          cpf,
          empresa?.id,
          args.allowCreatePacienteIfMissing ?? false,
        );
        if (!pac) {
          avisos.push(`Paciente não encontrado e não criado (CPF ${cpf}). Bloco ignorado.`);
          continue;
        }
        if (created) pacientesCriados++;

        // --- ASO ---
        let asoId: string | undefined;

        if (args.dryRun) {
        asoId = 'dry-run-aso';
        } else {
        const ret: any = await trx.query(
            `
            INSERT INTO public.aso
            (user_edit, dataemissaoaso, resultado, temexames, transmissaoesocial,
            ativo, paciente_id, empresa_id, tipopagamento_id, created_at, updated_at)
            VALUES
            ($1,        $2,            $3,        $4,         $5,
            $6,        $7,            $8,         $9,         now(), now())
            RETURNING id
            `,
            [
            'import',                    // $1
            dataBase,                    // $2
            true,                        // $3 resultado (boolean no banco)
            true,                        // $4 temexames
            false,                       // $5 transmissaoesocial
            true,                        // $6 ativo
            pac.id,                      // $7
            empresa?.id || null,         // $8
            CONVENIO_TIPOPAGAMENTO_ID,   // $9
            ],
        );

        // aceita os dois formatos de retorno
        const returnedId =
            Array.isArray(ret) ? ret[0]?.id :
            ret?.rows?.[0]?.id;

        if (!returnedId) {
            throw new Error(`INSERT ASO não retornou id. Retorno: ${JSON.stringify(ret)}`);
        }
        asoId = String(returnedId);
        }

        asosCriados++;


        // ---------------- EXAMES ----------------
        for (const ex of rows) {
          const examEntity = await this.findExameByNome(ex.exameNome);

          if (!examEntity && !(args.allowUnknownExam ?? false)) {
            avisos.push(`Exame não encontrado no catálogo: "${ex.exameNome}". Linha vinculada ignorada.`);
            continue;
          }

          const dataExame = ex.dataExame || dataBase;

          if (!args.dryRun) {
            await trx.query(
              `
              INSERT INTO public.exameaso
                (aso_id, exame_id, dataexame, datavalidadeexame,
                 ativo, desconto, valorexamesemdesconto, valorexame,
                 valormedico, valorems, user_desconto, created_at, updated_at)
              VALUES
                ($1,    $2,       $3,        $4,
                 true,  true,     $5,        $6,
                 0,     0,        $7,        now(),    now())
              `,
              [
                asoId,                             // $1 aso_id
                examEntity ? examEntity.id : null, // $2 exame_id (aceita null se allowUnknownExam)
                dataExame,                         // $3 dataexame
                dataExame,                         // $4 datavalidadeexame
                ex.valor ?? 0,                     // $5 valorexamesemdesconto
                ex.valor ?? 0,                     // $6 valorexame
                'import',                          // $7 user_desconto
              ],
            );
          }

          examesCriados++;
        }
      }
    });

    const result: ImportResult = {
      empresa: empresa ? { id: empresa.id, nome: (empresa as any).nome, cnpj: (empresa as any).cnpj } : null,
      periodo: rodape ? {
        inicio: rodape.periodoInicio?.toISOString().slice(0, 10),
        fim: rodape.periodoFim?.toISOString().slice(0, 10),
      } : null,
      contagens: { pacientesLidos, pacientesCriados, asosCriados, examesCriados, linhasIgnoradas },
      avisos,
      erros,
    };

    return result;
  }
}
