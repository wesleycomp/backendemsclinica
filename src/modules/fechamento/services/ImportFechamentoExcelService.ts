// src/modules/fechamento/services/ImportFechamentoExcelService.ts
import ExcelJS, { Worksheet } from 'exceljs';
import {
  getManager,
  getRepository,
  ILike,
  Repository,
} from 'typeorm';

// ✅ Ajuste esses imports para o caminho REAL dos teus entities
// import { Empresa } from '@modules/empresa/infra/typeorm/entities/Empresa';
// import { Paciente } from '@modules/paciente/infra/typeorm/entities/Paciente';
// import { Aso } from '@modules/aso/infra/typeorm/entities/Aso';
// import { Exame } from '@modules/exame/infra/typeorm/entities/Exame';
// import { ExameAso } from '@modules/exame/infra/typeorm/entities/ExameAso';

// --- Tipos mínimos (remova se for usar os imports reais acima)
class Empresa { id!: string; nome!: string; cnpj!: string; esocial!: boolean; convenio!: boolean; }
class Paciente {
  id!: string; nome!: string; cpf!: string; empresa_id?: string | null;
  matricula!: string; dataentradaempresa!: Date; descricaoatividade!: string;
  rg!: string; telefone!: string; ctps!: string; datanascimento!: Date; email!: string;
}
class Aso {
  id!: string;
  codigoaso!: number;
  user_edit!: string;
  dataemissaoaso!: Date;
  resultado!: boolean;
  temexames!: boolean;
  transmissaoesocial!: boolean;
  ativo!: boolean;
  paciente_id?: string | null;
  empresa_id?: string | null;
  tipopagamento_id?: string | null;
}
class Exame { id!: string; nome!: string; }
class ExameAso {
  id!: string;
  aso_id?: string | null;
  exame_id?: string | null;
  dataexame!: Date;
  datavalidadeexame!: Date;
  ativo!: boolean;
  desconto!: boolean;
  valorexamesemdesconto!: number;
  valorexame!: number;
  valormedico!: number;
  valorems!: number;
  user_desconto?: string | null;
}

// --------------------------------------------------------------

const CONVENIO_TIPOPAGAMENTO_ID = '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a';

type ImportArgs = {
  /** Buffer do .xlsx (req.body.file, multer, etc.) */
  file: Buffer;
  /** Nome original do arquivo (opcional, só para logs) */
  filename?: string;

  /** Sobrescreve empresa: se informado, ignora a do rodapé */
  empresaId?: string;
  empresaCnpj?: string;

  /** Cria Empresa automaticamente quando não encontrada (default: true) */
  allowCreateEmpresaIfMissing?: boolean;

  /** Cria Paciente automaticamente com placeholders quando não encontrado (default: false) */
  allowCreatePacienteIfMissing?: boolean;

  /** Permite lançar ExameAso mesmo sem vincular a um Exame (exame_id null) (default: false) */
  allowUnknownExam?: boolean;

  /** Executa tudo sem gravar no banco (default: false) */
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
  tipoAso?: string; // Admissional / Periódico / etc. (se vier)
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

  // -------- Helpers ---------------------------------------------------------

  private onlyDigits(s?: string) { return (s || '').replace(/\D+/g, ''); }

  private parseBrMoney(s?: string): number | undefined {
    if (!s) return;
    // aceita "R$ 2.240,00" ou "2240,00" etc.
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

  private rowJoin(ws: Worksheet, r: number, maxCols = 20): string {
    const parts: string[] = [];
    for (let c = 1; c <= Math.min(ws.columnCount || maxCols, maxCols); c++) {
      const t = (ws.getCell(r, c).text || '').toString().trim();
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

      // CNPJ
      if (!out.cnpj && /cnpj/i.test(line)) {
        const m = line.match(/(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})/);
        if (m) out.cnpj = this.onlyDigits(m[1]);
      }
      // Empresa
      if (!out.nome && /empresa\s*:/i.test(line)) {
        let txt = line.replace(/^.*?empresa\s*:\s*/i, '').trim();
        const mm = txt.match(/^\d+\s*-\s*(.+)$/); // "48326 - HAURA …"
        out.nome = (mm ? mm[1] : txt).trim();
      }
      // Período
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

  /** Heurística para extrair linhas de exames (genérica, tolera variações). */
  private scanExamRows(ws: Worksheet): ParsedExamRow[] {
    const rows: ParsedExamRow[] = [];
    let currentCpf: string | undefined;
    let currentNome: string | undefined;

    const TIPOS = ['Admissional', 'Periódico', 'Periodico', 'Retorno', 'Demissional', 'Mudança de Função', 'Mudanca de Funcao'];

    for (let r = 1; r <= ws.rowCount; r++) {
      const parts: string[] = [];
      const cells: string[] = [];
      for (let c = 1; c <= ws.columnCount; c++) {
        const t = (ws.getCell(r, c).text || '').toString().trim();
        cells.push(t);
        if (t) parts.push(t);
      }
      const line = parts.join(' ');
      if (!line) continue;

      // Nova pessoa?
      const cpfMatch = line.match(/(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/);
      if (cpfMatch) {
        currentCpf = this.onlyDigits(cpfMatch[1]);
        // tenta achar "Paciente: NOME" ou pega um bloco em letras
        let nome: string | undefined;
        const nomePac = line.match(/paciente\s*:\s*([A-Za-zÀ-ú\s']{3,})/i);
        if (nomePac) nome = nomePac[1].trim();
        else {
          // heurística: se a linha tem cpf e um texto grande antes dele, pego esse texto
          const idx = line.indexOf(cpfMatch[1]);
          if (idx > 0) nome = line.slice(0, idx).replace(/[:\-]/g, ' ').trim();
        }
        currentNome = nome;
        continue;
      }

      // Candidata a linha de exame: tem um valor e uma data
      const anyMoney = cells.find(t => /(^R\$\s*)?\d+(\.\d{3})*,\d{2}$/.test(t));
      const anyDate = cells.find(t => /\d{2}\/\d{2}\/\d{4}/.test(t));
      const anyTipo = cells.find(t => TIPOS.includes(t.trim()));

      if (anyMoney && anyDate) {
        // descrição = primeiro texto "mais longo" da linha
        const examName =
          cells
            .filter(t => t && !/\d{2}\/\d{2}\/\d{4}/.test(t) && !/(^R\$\s*)?\d+(\.\d{3})*,\d{2}$/.test(t) && !TIPOS.includes(t))
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

  private async ensureEmpresa(rodape: SheetCompany | undefined, args: ImportArgs): Promise<Empresa | undefined> {
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
      const novo = this.empresaRepo.create({
        nome: rodape?.nome || 'EMPRESA (import)',
        cnpj: rodape?.cnpj || '00000000000000',
        esocial: false,
        convenio: true,
      } as any);
      return args.dryRun ? novo : this.empresaRepo.save(novo);
    }

    return undefined;
  }

  private async getOrCreatePaciente(
    nome: string | undefined,
    cpf: string | undefined,
    empresaId: string | undefined,
    allowCreate: boolean,
  ): Promise<Paciente | undefined> {
    if (!cpf) return undefined;

    const found = await this.pacienteRepo.findOne({ where: { cpf: this.onlyDigits(cpf) } });
    if (found) {
      // garante vínculo de empresa se vier vazio
      if (!found.empresa_id && empresaId) {
        found.empresa_id = empresaId;
        await this.pacienteRepo.save(found);
      }
      return found;
    }

    if (!allowCreate) return undefined;

    // ⚠️ Campos NOT NULL da tua tabela Paciente — uso placeholders seguros
    const now = new Date();
    const novo = this.pacienteRepo.create({
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
    } as any);

    return await this.pacienteRepo.save(novo);
  }

  private async findExameByNome(nome?: string): Promise<Exame | undefined> {
    if (!nome) return undefined;
    return await this.exameRepo.findOne({ where: { nome: ILike(nome.trim()) } });
  }

  // -------------------------------------------------------------------------

  public async execute(args: ImportArgs): Promise<ImportResult> {
    const avisos: string[] = [];
    const erros: string[] = [];

    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(args.file);
    const ws = wb.worksheets[0];

    // 1) Empresa + Período
    const rodape = this.extractCompanyFromFooter(ws);
    const empresa = await this.ensureEmpresa(rodape, args);

    if (!empresa) {
      avisos.push('Empresa não identificada nem criada. Vou continuar, mas não vincularei ASO à empresa.');
    }

    // 2) Varre linhas de exames
    const parsed = this.scanExamRows(ws);

    // 3) Agrupa por Paciente + Data (um ASO por data/paciente)
    type Key = string; // `${cpf}|${yyyy-mm-dd}`
    const group = new Map<Key, ParsedExamRow[]>();

    let pacientesLidos = 0;
    let linhasIgnoradas = 0;

    for (const row of parsed) {
      if (!row.pacienteCpf) { linhasIgnoradas++; continue; }
      pacientesLidos++;

      const d = row.dataExame || rodape?.periodoInicio || new Date();
      const key = `${this.onlyDigits(row.pacienteCpf)}|${d.toISOString().slice(0,10)}`;
      if (!group.has(key)) group.set(key, []);
      group.get(key)!.push(row);
    }

    // 4) Transação para gravar
    let pacientesCriados = 0;
    let asosCriados = 0;
    let examesCriados = 0;

    const em = getManager();

    await em.transaction(async trx => {
      for (const [, rows] of group) {
        const sample = rows[0];
        const cpf = sample.pacienteCpf;
        const nome = sample.pacienteNome;
        const data = sample.dataExame || rodape?.periodoInicio || new Date();

        // Paciente
        const pac = await this.getOrCreatePaciente(
          nome,
          cpf,
          empresa?.id,
          args.allowCreatePacienteIfMissing ?? false,
        );

        if (!pac) {
          avisos.push(`Paciente não encontrado e não criado (CPF ${cpf}). Bloco ignorado.`);
          continue;
        }
        if (!pac.id) pacientesCriados++; // melhor estimativa; ignora se já existia

        // ASO
        const aso = this.asoRepo.create({
          user_edit: 'import',
          dataemissaoaso: data,
          resultado: true,
          temexames: true,
          transmissaoesocial: false,
          ativo: true,
          paciente_id: pac.id,
          empresa_id: empresa?.id || null,
          tipopagamento_id: CONVENIO_TIPOPAGAMENTO_ID,
        } as any);

        const asoSaved = args.dryRun ? aso : await trx.getRepository(Aso).save(aso);
        asosCriados++;

        // Exames
        for (const ex of rows) {
          const examEntity = await this.findExameByNome(ex.exameNome);

          if (!examEntity && !(args.allowUnknownExam ?? false)) {
            avisos.push(`Exame não encontrado no catálogo: "${ex.exameNome}". Linha vinculada ignorada.`);
            continue;
          }

          const dataExame = ex.dataExame || data;
          const ea = this.exameAsoRepo.create({
            aso_id: asoSaved.id,
            exame_id: examEntity?.id || null,
            dataexame: dataExame,
            datavalidadeexame: dataExame, // se não houver, igual à data do exame
            ativo: true,
            desconto: true,
            valorexamesemdesconto: ex.valor ?? 0,
            valorexame: ex.valor ?? 0,
            valormedico: 0,
            valorems: 0,
            user_desconto: 'import',
          } as any);

          if (!args.dryRun) await trx.getRepository(ExameAso).save(ea);
          examesCriados++;
        }
      }
    });

    const result: ImportResult = {
      empresa: empresa ? { id: empresa.id, nome: empresa.nome, cnpj: empresa.cnpj } : null,
      periodo: rodape ? {
        inicio: rodape.periodoInicio?.toISOString().slice(0,10),
        fim: rodape.periodoFim?.toISOString().slice(0,10),
      } : null,
      contagens: { pacientesLidos, pacientesCriados, asosCriados, examesCriados, linhasIgnoradas },
      avisos, erros,
    };

    return result;
  }
}
