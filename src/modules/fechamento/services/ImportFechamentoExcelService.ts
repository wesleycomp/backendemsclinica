// src/modules/fechamento/services/ImportFechamentoExcelService.ts
import ExcelJS, { Worksheet } from 'exceljs';
import { getManager, getRepository, ILike, Repository, EntityManager } from 'typeorm';


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

/** Normaliza texto (remove acento, caixa, espaços) p/ comparar descrições. */
private norm(s?: string) {
  return (s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();
}


private async ensureExameByNome(
  manager: EntityManager,
  nome: string,
  valor?: number
): Promise<Exame> {
  const repo = manager.getRepository(Exame);

  // tenta achar usando o repo dentro da transação (evita race)
  const cols = repo.metadata.columns.map(c => c.propertyName);
  const candidates = ['name','nome','descricao','titulo'];
  const where = candidates.filter(c => cols.includes(c))
                          .map(p => ({ [p]: ILike(nome.trim()) })) as any;
  const found = where.length ? await repo.findOne({ where }) : undefined;
  if (found) return found;

  // checa se procedimento_id é nullable no schema
  const q = await manager.query(`
    SELECT is_nullable
    FROM information_schema.columns
    WHERE table_schema='public' AND table_name='exame' AND column_name='procedimento_id'
  `);
  const isProcNullable =
    ((q?.rows ?? q)[0]?.is_nullable ?? '').toString().toUpperCase() === 'YES';

  let procedimento_id: string | null = null;

  if (!isProcNullable) {
    // pega qualquer procedimento existente para vincular
    const any = await manager.query(`SELECT id FROM public.procedimentos LIMIT 1`);
    const row = (any?.rows ?? any)[0];
    if (!row?.id) {
      throw new Error(
        'Não foi possível criar Exame: exame.procedimento_id é NOT NULL e não há registros em "procedimentos".'
      );
    }
    procedimento_id = row.id;
  }

  const novo = repo.create({
    name: nome.trim(),
    procedimento_id,
    valoravista: valor ?? 0,
    valormedico: 0,
    valorems: 0,
    ativo: true,
    localrealizacaoexame: 'IMPORT',
    usuariocadastro: 'import',
    usuarioedicao: 'import',
  } as Partial<Exame>) as Exame;

  return repo.save(novo);
}





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

  /** Remove "Funcionário", "CPF", sinais e duplicação exata do nome. */
private sanitizePacienteNome(s?: string): string | undefined {
  if (!s) return;
  let t = s
    .replace(/\bfuncion[aá]rio\b/ig, '')      // Funcionário / Funcionaria
    .replace(/\bcolaborador(a)?\b/ig, '')     // (se aparecer)
    .replace(/\bpaciente\b/ig, '')            // "Paciente"
    .replace(/\bnome\b/ig, '')                // "Nome"
    .replace(/\bcpf\b/ig, '')                 // "CPF"
    .replace(/[:\-]/g, ' ')                   // separadores
    .replace(/\s+/g, ' ')                     // espaços
    .trim();

  // Se a frase for repetida duas vezes (ex.: "NOME NOME"), mantém uma vez só
  const dup = t.match(/^(.+?)\s+\1$/i);
  if (dup) t = dup[1].trim();

  return t || undefined;
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



  /** Extrai o texto entre "Empresa:" e "Período:" (ou "Periodo:"), incluindo quebras de linha. */
private betweenEmpresaPeriodo(block: string): string | undefined {
  const m = block.match(/empresa\s*:\s*([\s\S]*?)\bperi[oó]do\s*:/i);
  if (!m) return;

  // limpa "48326 - " e espaços extras
  let nome = m[1]
    .replace(/^\s*\d+\s*[-–]\s*/i, '') // remove código + traço
    .replace(/\s+/g, ' ')
    .trim();

  return nome || undefined;
}


private extractCompanyFromFooter(ws: Worksheet): SheetCompany | undefined {
  const out: SheetCompany = {};
  const read = (r: number) => this.rowJoin(ws, r);

  // função auxiliar: se "Período:" não aparecer, corta por outros marcadores
  const parseEmpresaFromBlock = (block: string): string | undefined => {
    let txt = (block.match(/empresa\s*:\s*([\s\S]*?)$/i)?.[1] || '').trim();

    // corta no primeiro marcador pós-nome
    txt = (txt.split(/peri[oó]do\b|total\s+da\s+fatura\b|endere[cç]o\b|cnpj\b|resumo\b|exames\s+realizados\b/i)[0] || txt).trim();

    // remove "12345 - " do início e normaliza espaços
    txt = txt.replace(/^\s*\d+\s*[-–]\s*/i, '').replace(/\s+/g, ' ').trim();

    return txt || undefined;
  };

  // ============ PASSO 1: varre de baixo pra cima ============
  const start = Math.max(1, ws.rowCount - 300);
  for (let r = ws.rowCount; r >= start; r--) {
    const line = read(r);
    if (!line) continue;

    // CNPJ
    if (!out.cnpj && /cnpj/i.test(line)) {
      const m = line.match(/(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})/);
      if (m) out.cnpj = this.onlyDigits(m[1]);
    }

    // Período
    if (!out.periodoInicio && /peri[oó]do/i.test(line)) {
      const mm = line.match(/(\d{2}\/\d{2}\/\d{4}).*?(\d{2}\/\d{2}\/\d{4})/);
      if (mm) {
        out.periodoInicio = this.parseBrDate(mm[1]);
        out.periodoFim = this.parseBrDate(mm[2]);
      }
    }

    // Empresa
    if (!out.nome && /empresa\s*:/i.test(line)) {
      let block = line;
      for (let k = 1; k <= 8; k++) {
        const nxt = read(r + k);
        if (nxt) block += '\n' + nxt;
      }
      // tenta: (Empresa: ... Período:) e, se não achar, fallback
      const nome = this.betweenEmpresaPeriodo(block) || parseEmpresaFromBlock(block);
      if (nome) out.nome = nome;
    }

    if (out.nome && out.cnpj && out.periodoInicio) break;
  }

  // ============ PASSO 2: fallback do topo (corrigido) ============
  if (!out.nome) {
    const top = Math.min(120, ws.rowCount);
    for (let r = 1; r <= top; r++) {
      const line = read(r);
      if (!line) continue;

      if (/empresa\s*:/i.test(line)) {
        let block = line;
        for (let k = 1; k <= 8; k++) {
          const nxt = read(r + k);
          if (nxt) block += '\n' + nxt;
        }
        const nome = this.betweenEmpresaPeriodo(block) || parseEmpresaFromBlock(block);
        if (nome) { out.nome = nome; break; }
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

      // <- LISTA + normalização (inclui "Retorno ao Trabalho")
  const TIPOS = [
    'Admissional',
    'Periódico',
    'Periodico',
    'Retorno',
    'Retorno ao Trabalho',
    'Demissional',
    'Mudança de Função',
    'Mudanca de Funcao',
  ];
  const TIPOS_NORM = new Set(TIPOS.map(t => this.norm(t)));
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
        if (nomePac) nome = this.sanitizePacienteNome(nomePac[1].trim());
        else {
          // Heurística: texto antes do CPF
          const idx = line.indexOf(cpfMatch[1]);
          if (idx > 0) nome = line.slice(0, idx).replace(/[:\-]/g, ' ').trim();
        }
       currentNome = this.sanitizePacienteNome(nome);

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
        const nomeClean = rodape.nome.replace(/\s+/g, ' ').trim();
        const e = await this.empresaRepo.findOne({ where: { nome: ILike(nomeClean) } });
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
  manager: EntityManager,
  nome: string | undefined,
  cpf: string | undefined,
  empresaId: string | undefined,
  allowCreate: boolean,
): Promise<{ pac?: Paciente; created: boolean }> {
  if (!cpf) return { pac: undefined, created: false };

  const repo = manager.getRepository(Paciente); // <-- usa o repo da transação
  const cpfDigits = this.onlyDigits(cpf);

  const found = await repo.findOne({ where: { cpf: cpfDigits } });
  if (found) {
    if (!found.empresa_id && empresaId) {
      found.empresa_id = empresaId;
      await repo.save(found);
    }
    return { pac: found, created: false };
  }

  if (!allowCreate) return { pac: undefined, created: false };

  const now = new Date();
  const novo = repo.create({
    nome: nome || 'PACIENTE (import)',
    cpf: cpfDigits,
    empresa_id: empresaId || null,
    matricula: 'IMPORT',
    dataentradaempresa: now,
    descricaoatividade: 'IMPORTADO',
    rg: 'ISENTO',
    telefone: '00000000000',
    ctps: 'ISENTO',
    datanascimento: new Date(1970, 0, 1),
    email: `import+${cpfDigits}@local.test`,
  } as Partial<Paciente>) as Paciente;

  const saved = await repo.save(novo);
  return { pac: saved, created: true };
}




    private async findExameByNome(nome?: string): Promise<Exame | undefined> {
    if (!nome) return undefined;
    const cols = this.exameRepo.metadata.columns.map(c => c.propertyName);
    const candidates = ['name','nome','descricao','titulo']; // prioriza 'name'
    const where = candidates.filter(c => cols.includes(c))
                            .map(p => ({ [p]: ILike(nome.trim()) })) as any;
    if (!where.length) return undefined;
    return this.exameRepo.findOne({ where });
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



    const cpfsVistos = new Set<string>();
    let linhasIgnoradas = 0;

    for (const row of parsed) {

    if (!row.pacienteCpf) { linhasIgnoradas++; continue; }

    const cpfDigits = this.onlyDigits(row.pacienteCpf);
    cpfsVistos.add(cpfDigits);

    const d = row.dataExame || rodape?.periodoInicio || new Date();
    const key = `${cpfDigits}|${d.toISOString().slice(0, 10)}`;
    if (!group.has(key)) group.set(key, []);
    group.get(key)!.push(row);
    }

    // 5) Transação para gravar
    let pacientesCriados = 0;
    let asosCriados = 0;
   // let examesCriados = 0;
    let pacientesLidos = cpfsVistos.size;
    let examesTiposCriados = 0;   // novos na tabela exame
    let examesAsoInseridos = 0;   // linhas em exameaso
    // default: criar paciente se não existir (a menos que seja passado false explicitamente)
    const allowCreatePac = args.allowCreatePacienteIfMissing !== false;

    // Descobre colunas reais da tabela exameaso para montar INSERT conforme o schema atual
    const exameAsoColsRaw = await getManager().query(`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema='public' AND table_name='exameaso'
    `);
    const exameAsoCols = new Set(
    (exameAsoColsRaw?.rows ?? exameAsoColsRaw).map((r: any) => r.column_name)
    );
    const hasDataExame       = exameAsoCols.has('dataexame');
    const hasDataValidade    = exameAsoCols.has('datavalidadeexame');
    const hasDataCadastro    = exameAsoCols.has('data_cadastro_exame');
    const hasTipoPagamentoId = exameAsoCols.has('tipopagamento_id');
    const createdPacIds = new Set<string>();



        // --- colunas de ASO e mapa de tipoaso ---
        const asoColsRaw = await getManager().query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema='public' AND table_name='aso'
        `);
        const asoCols = new Set(
        (asoColsRaw?.rows ?? asoColsRaw).map((r: any) => r.column_name)
        );
        const hasAsoTipoAsoId = asoCols.has('tipoaso_id');

        // carrega todos os tipos de ASO e monta um mapa por descrição normalizada
        const tipoAsoRows = await getManager().query(`
        SELECT id, descricao FROM public.tipoaso
        `);
        const tipoAsoMap = new Map<string, string>();
        for (const r of (tipoAsoRows?.rows ?? tipoAsoRows)) {
        tipoAsoMap.set(this.norm(r.descricao), r.id);
        }





    await getManager().transaction(async trx => {

      for (const rows of Array.from(group.values())) {
        const sample = rows[0];
        const cpf = sample.pacienteCpf;
        const nome = sample.pacienteNome;

        const dataBase = sample.dataExame || rodape?.periodoInicio || new Date();


        // determina o tipo de ASO do bloco (pega o 1º que aparecer nas linhas)
        const rawTipoAso = rows.map(r => r.tipoAso).find(Boolean) || '';
        let tipoKey = this.norm(rawTipoAso);
        // alias simples: muitos arquivos trazem só "RETORNO"
        if (tipoKey === 'RETORNO') tipoKey = 'RETORNO AO TRABALHO';

        // id correspondente na tabela tipoaso (ou null se não achar)
        const tipoAsoId = tipoAsoMap.get(tipoKey) || null;



        // ---------------- Paciente ----------------
      const { pac, created } = await this.getOrCreatePaciente(
                trx,                 // <-- passa o manager da transação
                nome,
                cpf,
                empresa?.id,
                allowCreatePac,
                );

                if (!pac) {
                avisos.push(`Paciente não encontrado e não criado (CPF ${cpf}). Bloco ignorado.`);
                continue;
                }

                if (created && pac.id) createdPacIds.add(pac.id);
                 // --- ASO ---
                  let asoId: string | undefined;
                  if (args.dryRun) {
                       asoId = 'dry-run-aso';
                  } else {

                    // monta INSERT de ASO dinamicamente (inclui tipoaso_id se existir no schema)
                        const asoColumns: string[] = [
                        'user_edit',
                        'dataemissaoaso',
                        'resultado',
                        'temexames',
                        'transmissaoesocial',
                        'ativo',
                        'paciente_id',
                        'empresa_id',
                        'tipopagamento_id',
                        ];
                        const asoValues: any[] = [
                        'import',
                        dataBase,
                        true,        // resultado
                        true,        // temexames
                        false,       // transmissaoesocial
                        true,        // ativo
                        pac.id,
                        empresa?.id || null,
                        CONVENIO_TIPOPAGAMENTO_ID,
                        ];

                        if (hasAsoTipoAsoId) {
                        asoColumns.push('tipoaso_id');
                        asoValues.push(tipoAsoId); // pode ser null se não encontrado, e tudo bem
                        }

                        // auditoria
                        asoColumns.push('created_at', 'updated_at');
                        asoValues.push(new Date(), new Date());

                        const asoPlaceholders = asoValues.map((_, i) => `$${i + 1}`).join(', ');

                        const ret: any = await trx.query(
                        `INSERT INTO public.aso (${asoColumns.join(', ')}) VALUES (${asoPlaceholders}) RETURNING id`,
                        asoValues
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
        const dataExame = ex.dataExame || dataBase;

        if (!ex.exameNome || !ex.exameNome.trim()) {
            avisos.push(`Linha ignorada: exame sem nome (CPF ${cpf}, ${dataExame?.toISOString().slice(0,10)})`);
            continue;
        }

        // 1) tenta achar; se não existir, cria
        let examEntity = await this.findExameByNome(ex.exameNome);
        if (!examEntity) {
            examEntity = await this.ensureExameByNome(trx, ex.exameNome, ex.valor);
            examesTiposCriados++; // conta tipos novos
        // examesCriados++; // conta novos cadastros de exame
        }

            if (!args.dryRun) {
                // monta INSERT conforme colunas existentes
                const columns: string[] = [
                'aso_id',
                'exame_id',
                // datas entram dinamicamente
                'ativo',
                'desconto',
                'valorexamesemdesconto',
                'valorexame',
                'valormedico',
                'valorems',
                'user_desconto',
                // tipopagamento_id se existir
                'created_at',
                'updated_at',
                ];
                const values: any[] = [
                asoId,               // aso_id
                examEntity.id,       // exame_id SEMPRE preenchido agora
                // datas...
                true,                // ativo
                true,                // desconto
                ex.valor ?? 0,       // valorexamesemdesconto
                ex.valor ?? 0,       // valorexame
                0,                   // valormedico
                0,                   // valorems
                'import',            // user_desconto
                new Date(),          // created_at
                new Date(),          // updated_at
                ];

                // insere datas conforme existirem no schema
                let insertPos = 2; // após exame_id
                if (hasDataExame) {
                columns.splice(insertPos, 0, 'dataexame');
                values.splice(insertPos, 0, dataExame);
                insertPos++;
                }
                if (hasDataValidade) {
                columns.splice(insertPos, 0, 'datavalidadeexame');
                values.splice(insertPos, 0, dataExame);
                insertPos++;
                }
                if (hasDataCadastro) {
                columns.push('data_cadastro_exame');
                values.push(dataExame);
                }



                // tipopagamento_id (se existir no schema atual)

                    if (hasTipoPagamentoId) {
                    const idxBeforeAudit = columns.indexOf('created_at');
                    const insertIdx = idxBeforeAudit >= 0 ? idxBeforeAudit : columns.length;
                    columns.splice(insertIdx, 0, 'tipopagamento_id');
                    values.splice(insertIdx, 0, CONVENIO_TIPOPAGAMENTO_ID);
                    }



                const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
                    await trx.query(
                    `INSERT INTO public.exameaso (${columns.join(', ')}) VALUES (${placeholders})`,
                    values
                    );
                    examesAsoInseridos++;

                }
            }
      }
    });

  // >>> AQUI: total de pacientes efetivamente criados nesta importação
    pacientesCriados = createdPacIds.size;


    const result: ImportResult = {
      empresa: empresa ? { id: empresa.id, nome: (empresa as any).nome, cnpj: (empresa as any).cnpj } : null,
      periodo: rodape ? {
        inicio: rodape.periodoInicio?.toISOString().slice(0, 10),
        fim: rodape.periodoFim?.toISOString().slice(0, 10),
      } : null,
      contagens: { pacientesLidos, pacientesCriados, asosCriados,  examesCriados: examesAsoInseridos, linhasIgnoradas },
      avisos,
      erros,
    } as any;

        // opcional:
        (result as any).contagens.novosTiposExame = examesTiposCriados;

    return result;
  }


}
