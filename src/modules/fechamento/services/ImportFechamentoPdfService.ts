// src/modules/fechamento/services/ImportFechamentoPdfService.ts
import { getManager, getRepository, ILike, Repository, EntityManager } from 'typeorm';
// tipagem: crie src/types/pdf-parse.d.ts com `export = pdf;` conforme te passei
import pdf from 'pdf-parse';

import Empresa from '@modules/empresa/typeorm/entities/Empresa';
import Paciente from '@modules/paciente/typeorm/entities/Paciente';
import Aso from '@modules/aso/typeorm/entities/Aso';
import Exame from '@modules/exame/typeorm/entities/Exame';
import ExameAso from '@modules/aso/typeorm/entities/ExamesAso';

const CONVENIO_TIPOPAGAMENTO_ID = '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a';
const FUNCAO_ID = '02149a1a-1624-4fdf-8141-5484b44097c7';
const MEDICO_ID = '50ecb9f4-538d-4d7a-a54e-8c4d3317462f';
const USER_ID = 'af01a591-aeaa-4798-b565-e6b2827775d3';


// mapa fixo dos tipos de ASO -> IDs no banco
const TIPO_ASO_FIX: Record<string, string> = {
  'ADMISSIONAL': '47184d56-5a69-40a3-80cb-1ed303bda66d',
  'MUDANCA DE FUNCAO': 'b3dd6b5b-3786-4ca1-8738-3be3e832366d',
  'RETORNO AO TRABALHO': '7941407e-1ab2-4a04-a1fb-da4d03d0216f',
  'DEMISSIONAL': 'e92233ab-45d5-443d-807d-3030361f9692',
  'PERIODICO': '82dcb1dc-cd0b-42d5-9a75-f3c4b4cc7863',
};
const RESULTADO_OK = true as unknown as Aso['resultado'];

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
    examesCriados: number; // linhas em exameaso
    linhasIgnoradas: number;
    novosTiposExame?: number;
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

export default class ImportFechamentoPdfService {
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

  // ---------- helpers ----------


  private mapTipoAsoToId(tipo?: string): string {
  // normaliza: remove acento, upper, trim...
  let k = this.norm(tipo);

  // aceitar só o "primeiro campo" e variações do PDF
  if (k.startsWith('RETORNO')) k = 'RETORNO AO TRABALHO';
  else if (k.startsWith('MUDANCA')) k = 'MUDANCA DE FUNCAO';
  else if (k.startsWith('PERIODO') || k.startsWith('PERIODICO')) k = 'PERIODICO';
  else if (k.startsWith('ADMIS')) k = 'ADMISSIONAL';
  else if (k.startsWith('DEMIS')) k = 'DEMISSIONAL';

  // fallback seguro (para nunca gerar null em coluna NOT NULL)
  return TIPO_ASO_FIX[k] ?? TIPO_ASO_FIX['ADMISSIONAL'];
}


  /** 11 dígitos -> 999.999.999-99; se não tiver 11, devolve a string original “trimada”. */
private formatCpf(cpf?: string): string {
  const d = this.onlyDigits(cpf);
  if (d.length !== 11) return (cpf ?? '').trim();
  return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/** Procura paciente por CPF (com ou sem máscara) comparando por dígitos. */
private async findPacienteByCpfAny(manager: EntityManager, cpf?: string): Promise<Paciente | undefined> {
  const d = this.onlyDigits(cpf);
  if (!d) return undefined;
  return manager.getRepository(Paciente)
    .createQueryBuilder('p')
    .where("regexp_replace(coalesce(p.cpf, ''), '\\D', '', 'g') = :d", { d })
    .getOne();
}


/** 14 dígitos -> 99.999.999/9999-99; se não tiver 14, retorna string original “trimada”. */
private formatCnpj(cnpj?: string): string {
  const d = this.onlyDigits(cnpj);
  if (d.length !== 14) return (cnpj ?? '').trim();
  return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
}

/** Procura empresa por CNPJ (com ou sem máscara) comparando por dígitos. */
private async findEmpresaByCnpjAny(cnpj?: string): Promise<Empresa | undefined> {
  const d = this.onlyDigits(cnpj);
  if (!d) return undefined;
  return this.empresaRepo
    .createQueryBuilder('e')
    .where("regexp_replace(coalesce(e.cnpj, ''), '\\D', '', 'g') = :d", { d })
    .getOne();
}



/** Remove a seção "Resumo de Faturamento" (e similares) do texto. */
private stripResumoDeFaturamento(txt: string): string {
  const t = txt.replace(/\u00A0/g, ' ');

  // 1) procura pelo início típico do resumo
  const headerIdx = t.search(/\b(Resumo\s+de\s+Faturamento|Exames\s+Realizados)\b/i);
  if (headerIdx < 0) return txt;

  // 2) confirma que ali perto existem cabeçalhos de coluna do resumo
  const window = t.slice(headerIdx, headerIdx + 800); // janela curta após o header
  const hasCols = /\bQuantidade\b/i.test(window)
               || /\bValor\s+Unit[áa]rio\b/i.test(window)
               || /\bValor\s+Total\b/i.test(window)
               || /\bTotal\s+Geral\s+da\s+Fatura\b/i.test(window);

  return hasCols ? t.slice(0, headerIdx) : txt;
}





private scanExamRowsFromText(txt: string): ParsedExamRow[] {
  // garante que qualquer "Resumo..." remanescente seja removido
  txt = this.stripResumoDeFaturamento(txt);

  const raw = txt.split(/\r?\n/).map(l =>
    l.replace(/\u00A0/g, ' ').replace(/[ \t]+/g, ' ').trim()
  );
  const lines = raw.filter(Boolean);

  const TIPOS = ['Admissional','Periódico','Periodico','Retorno','Retorno ao Trabalho','Demissional','Mudança de Função','Mudanca de Funcao'];
  const tipoRe  = /(Admissional|Per[íi]odico|Retorno(?: ao Trabalho)?|Demissional|Mudan[çc]a de Fun[çc]ão)/i;
  const dateRe  = /\b\d{2}\/\d{2}\/\d{4}\b/;
  const moneyRe = /\b(?:R\$\s*)?\d{1,3}(?:\.\d{3})*,\d{2}\b/;

  const normalize = (s: string) => s
    .replace(/(\d,\d{2})(?=\d{2}\/\d{2}\/\d{4})/g, '$1 ')
    .replace(/(Admissional|Demissional|Per[íi]odico|Retorno(?: ao Trabalho)?|Mudan[çc]a de Fun[çc]ão)(?=[A-Za-zÁ-Úá-ú])/g, '$1 ')
    .replace(/([A-Za-zÁ-Úá-ú])R\$/g, '$1 R$')
    .trim();

  const headerLine = (s: string) =>
    /^(Relat[óo]rio\s+de\s+Faturamento\s+Mensal|Empresa\s*:|CNPJ\s*:|Fantasia\s*:|Per[ií]odo\s*:|Total\s+da\s+Fatura\s*:|Total\s+Geral\s+da\s+Fatura|Endere[çc]o\s*:|P[áa]gina\s+\d+\s+de\s+\d+|Resumo\s+de\s+Faturamento|Exames\s+Realizados)\b/i
      .test(s);

  const rows: ParsedExamRow[] = [];
  let currentCpf: string | undefined;
  let currentNome: string | undefined;

  for (let i = 0; i < lines.length; i++) {
    let line = normalize(lines[i]);

    if (headerLine(line)) { currentCpf = undefined; currentNome = undefined; continue; }

    // Funcionário + CPF na mesma linha
    const mFuncCpf = line.match(/Funcion[aá]rio\s*:?\s*(.+?)\s+CPF\s*:?\s*([\d.\-]+)/i);
    if (mFuncCpf) { currentNome = this.sanitizePacienteNome(mFuncCpf[1]); currentCpf = this.onlyDigits(mFuncCpf[2]); continue; }

    // Só Funcionário (CPF pode vir depois)
    const mFuncOnly = line.match(/Funcion[aá]rio\s*:?\s*(.+)$/i);
    if (mFuncOnly) { currentNome = this.sanitizePacienteNome(mFuncOnly[1]); continue; }

    // CPF em linha separada
    const mCpf = line.match(/\bCPF\s*:?\s*([\d.\-]+)/i) || line.match(/(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/);
    if (mCpf) { currentCpf = this.onlyDigits(mCpf[1] || mCpf[0]); continue; }

    // Cabeçalhos/totais
    if (/^Exame\b.*\bData\b.*\bTipo\b.*\bValor\b/i.test(line)) continue;
    if (/^Exame\b.*\bValor\b.*\bData\b/i.test(line)) continue;
    if (/^Fun[cç][aã]o\s*:/i.test(line)) continue;
    if (/^Total\b/i.test(line)) continue;

    if (!currentCpf) continue;

    // Linha + próxima (só se a próxima não for cabeçalho)
    let next = lines[i + 1] ? normalize(lines[i + 1]) : '';
    if (next && headerLine(next)) next = '';
    const two = (line + (next ? ' ' + next : '')).trim();

    // limites (R$, valor, data)
    const dateMatch  = two.match(dateRe);
    const moneyMatch = two.match(moneyRe);
    const idxDate  = dateMatch  ? two.indexOf(dateMatch[0])  : -1;
    const idxMoney = moneyMatch ? two.indexOf(moneyMatch[0]) : -1;
    const idxRS    = two.indexOf('R$');

    let boundary = Number.MAX_SAFE_INTEGER;
    for (const idx of [idxRS, idxMoney, idxDate]) if (idx >= 0 && idx < boundary) boundary = idx;
    if (boundary === Number.MAX_SAFE_INTEGER) continue;

    // texto à esquerda do primeiro token
    let left = two.slice(0, boundary).replace(/^Exame\s*:?/i, '').trim();

    // NÃO é exame se começa com rótulos de cabeçalho
    if (/^(Empresa|CNPJ|Fantasia|Per[ií]odo|Total\s+da\s+Fatura|Endere[çc]o)\s*:/i.test(left)) continue;

    // Remove tipo colado no início
    if (left.toLowerCase().startsWith((left.match(tipoRe)?.[0] || '').toLowerCase())) {
      left = left.replace(tipoRe, '').trim();
    }
    // Remove tipo separadinho no início
    left = left.replace(new RegExp('^' + tipoRe.source + '\\s+', 'i'), '').trim();

    const dataExame = idxDate >= 0 ? this.parseBrDate(dateMatch![0]) : undefined;
    const valor     = moneyMatch ? this.parseBrMoney(moneyMatch[0])   : undefined;

    const exameNome = left
      .replace(/\s*R\$.*/i, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/[:\-]\s*$/, '')
      .trim();

    if (!exameNome) continue;

    // Se o tipo vier depois da data
    let tipoAso: string | undefined;
    if (idxDate >= 0) {
      const afterDate = two.slice(idxDate);
      const m = afterDate.match(tipoRe);
      if (m) tipoAso = m[0];
    }

    rows.push({ pacienteNome: currentNome, pacienteCpf: currentCpf, dataExame, tipoAso, exameNome, valor });

    if (boundary >= line.length && next) i++;
  }

  return rows;
}





  private norm(s?: string) {
    return (s || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toUpperCase().replace(/\s+/g, ' ').trim();
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

  private sanitizePacienteNome(s?: string): string | undefined {
    if (!s) return;
    let t = s
      .replace(/\bfuncion[aá]rio\b/ig, '')
      .replace(/\bcolaborador(a)?\b/ig, '')
      .replace(/\bpaciente\b/ig, '')
      .replace(/\bnome\b/ig, '')
      .replace(/\bcpf\b/ig, '')
      .replace(/[:\-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    const dup = t.match(/^(.+?)\s+\1$/i);
    if (dup) t = dup[1].trim();
    return t || undefined;
  }


private async readPagesFromPdf(buffer: Buffer): Promise<string[]> {
  const pages: string[] = [];

  await (pdf as any)(buffer, {
    pagerender: (pageData: any) => {
      // Pedimos os itens de texto sem serem colados
      const opts = { normalizeWhitespace: true, disableCombineTextItems: true };
      return pageData.getTextContent(opts).then((tc: any) => {
        const items = (tc.items || []);
        let out: string[] = [];
        let buf = '';
        let lastY: number | null = null;

        // tolerância de variação vertical para "nova linha"
        const EPS = 2;

        for (const it of items) {
          const s = it.str || '';
          const tr = Array.isArray(it.transform) ? it.transform : [];
          const y  = typeof tr[5] === 'number' ? Math.round(tr[5]) : null;

          if (lastY !== null && y !== null && Math.abs(y - lastY) > EPS) {
            // terminou a linha anterior
            out.push(buf.replace(/[ \t]+$/g, ''));
            buf = '';
          }

          buf += s + ' ';
          if (y !== null) lastY = y;

          // alguns PDFs marcam fim de linha
          if ((it as any).hasEOL) {
            out.push(buf.replace(/[ \t]+$/g, ''));
            buf = '';
            lastY = null;
          }
        }
        if (buf.trim()) out.push(buf.replace(/[ \t]+$/g, ''));

        const text = out
          .map(l => l.replace(/[ \t]{2,}/g, ' ').trim())
          .filter(Boolean)
          .join('\n');

        pages.push(text);
        return text; // o pdf-parse usa isso para res.text (não utilizamos)
      });
    },
  });

  return pages;
}


/** Extrai CNPJ, período e NOME da empresa apenas do cabeçalho da 1ª página. */
private extractCompanyFromText(txt: string): SheetCompany | undefined {
  const out: SheetCompany = {};
  const t = (txt || '').replace(/\u00A0/g, ' ').replace(/[ \t]+/g, ' ').trim();

  // Delimita o "cabeçalho": do início até antes do primeiro bloco de dados
  const stopMarkers = [
    'Funcionário', 'Funcionario', 'Exame', 'Resumo de Faturamento',
    'Exames Realizados', 'Página', 'Pagina', 'Total da Fatura'
  ];
  let cut = t.length;
  for (const m of stopMarkers) {
    const idx = t.search(new RegExp(`\\b${m}\\b`, 'i'));
    if (idx >= 0 && idx < cut) cut = idx;
  }
  const head = t.slice(0, cut);

  // CNPJ
  const cnpj = head.match(/\bCNPJ\s*:?\s*([\d.\-\/]{14,18})/i)?.[1];
  if (cnpj) out.cnpj = this.onlyDigits(cnpj);

  // Período
  const per = head.match(/\bPer[ií]odo(?:\s*de)?\s*:?\s*(\d{2}\/\d{2}\/\d{4})\s*(?:a|até|ate)\s*(\d{2}\/\d{2}\/\d{4})/i);
  if (per) {
    out.periodoInicio = this.parseBrDate(per[1]);
    out.periodoFim    = this.parseBrDate(per[2]);
  }

  // Nome da empresa
  // 1) Se existir "Empresa:", pega até o próximo rótulo conhecido
  const emp1 = head.match(
    /\bEmpresa\s*:?\s*(?:\d+\s*[-–]\s*)?(.+?)(?=\s+(?:CNPJ|Per[ií]odo|Fantasia|Endere[çc]o|Total\s+da\s+Fatura|P[áa]gina|Resumo\s+de\s+Faturamento)\b)/i
  )?.[1];

  // 2) Fallback: frase com sufixo societário no cabeçalho (sem rótulo)
  const suffix = '(?:LTDA|L\\.?T\\.?D\\.?A\\.?|EIRELI|EPP|ME|MEI|S\\.?A\\.?|S\\/A)';
  const emp2 = head.match(new RegExp(`\\b([A-ZÁ-Ú0-9][A-ZÁ-Ú0-9\\s\\.,&\\-\\/']*?${suffix})\\b`, 'i'))?.[1];

  let nome = (emp1 || emp2 || '')
    .replace(/^\d+\s*[-–]\s*/, '')   // remove "19826 - "
    .replace(/\s{2,}/g, ' ')
    .trim();

  if (nome) out.nome = nome;
  return (out.cnpj || out.nome) ? out : undefined;
}










  private async ensureExameByNome(manager: EntityManager, nome: string, valor?: number): Promise<Exame> {
    const repo = manager.getRepository(Exame);
    const cols = repo.metadata.columns.map(c => c.propertyName);
    const candidates = ['name', 'nome', 'descricao', 'titulo'];
    const where = candidates.filter(c => cols.includes(c)).map(p => ({ [p]: ILike(nome.trim()) })) as any;
    const found = where.length ? await repo.findOne({ where }) : undefined;
    if (found) return found;

    const q = await manager.query(`
      SELECT is_nullable
      FROM information_schema.columns
      WHERE table_schema='public' AND table_name='exame' AND column_name='procedimento_id'
    `);
    const isProcNullable = ((q?.rows ?? q)[0]?.is_nullable ?? '').toString().toUpperCase() === 'YES';

    let procedimento_id: string | null = null;
    if (!isProcNullable) {
      const any = await manager.query(`SELECT id FROM public.procedimentos LIMIT 1`);
      const row = (any?.rows ?? any)[0];
      if (!row?.id) throw new Error('Não foi possível criar Exame: sem procedimento disponível.');
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

  private async findExameByNome(nome?: string): Promise<Exame | undefined> {
    if (!nome) return undefined;
    const cols = this.exameRepo.metadata.columns.map(c => c.propertyName);
    const candidates = ['name','nome','descricao','titulo'];
    const where = candidates.filter(c => cols.includes(c)).map(p => ({ [p]: ILike(nome.trim()) })) as any;
    if (!where.length) return undefined;
    return this.exameRepo.findOne({ where });
  }






private async getOrCreatePaciente(
  manager: EntityManager,
  nome: string | undefined,
  cpf: string | undefined,
  empresaId: string | undefined,
  allowCreate: boolean,
): Promise<{ pac?: Paciente; created: boolean }> {
  const cpfDigits = this.onlyDigits(cpf);
  if (!cpfDigits) return { pac: undefined, created: false };

  const repo = manager.getRepository(Paciente);

  // 1) Tenta achar por CPF ignorando máscara
  let found = await this.findPacienteByCpfAny(manager, cpfDigits);
  if (found) {
    // vincula empresa se estiver faltando
    if (!found.empresa_id && empresaId) {
      (found as any).empresa_id = empresaId;
    }
    // (opcional) normaliza máscara se no banco estiver sem máscara
    if (this.onlyDigits(found.cpf).length === 11 && !/[.\-]/.test(found.cpf)) {
      (found as any).cpf = this.formatCpf(found.cpf);
    }
    if (!found.empresa_id || !/[.\-]/.test(found.cpf)) {
      await repo.save(found);
    }
    return { pac: found, created: false };
  }

  // 2) Não criar?
  if (!allowCreate) return { pac: undefined, created: false };

  // 3) Cria paciente novo salvando CPF mascarado
  const now = new Date();
  const novo = repo.create({
    nome: nome || 'PACIENTE (import)',
    cpf: this.formatCpf(cpfDigits),          // <- sempre mascarado
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







private async ensureEmpresa(rodape: SheetCompany | undefined, args: ImportArgs): Promise<Empresa | undefined> {
  // 1) Se veio empresaId, usa
  if (args.empresaId) {
    const e = await this.empresaRepo.findOne(args.empresaId);
    if (e) return e;
  }

  // 2) Candidato de CNPJ (prioriza o ‘forçar CNPJ’, depois o do PDF)
  const cnpjInput = args.empresaCnpj ?? rodape?.cnpj;
  const cnpjDigits = this.onlyDigits(cnpjInput);

  // 2.1) Tenta achar por CNPJ (independente de máscara no banco)
  if (cnpjDigits) {
    const e = await this.findEmpresaByCnpjAny(cnpjDigits);
    if (e) return e;
  }

  // 3) Se não temos CNPJ, tenta pelo nome (ajuda a reaproveitar já cadastradas)
  if (rodape?.nome) {
    const nomeClean = rodape.nome.replace(/\s+/g, ' ').trim();
    const e = await this.empresaRepo.findOne({ where: { nome: ILike(nomeClean) } });
    if (e) return e;
  }

  // 4) Criar empresa? Só se permitido e tomando cuidado com CNPJ
  if ((rodape?.nome || cnpjDigits) && (args.allowCreateEmpresaIfMissing ?? true)) {
    const novo: Empresa = this.empresaRepo.create({
      nome: rodape?.nome || 'EMPRESA (import)',
      // salva sempre mascarado; se faltar CNPJ, salva vazio mascarado “00…00”
      cnpj: this.formatCnpj(cnpjDigits || '00000000000000'),
      esocial: false,
      convenio: true,
    } as Partial<Empresa>) as Empresa;

    if (args.dryRun) return novo;

    // antes de salvar, mais uma verificação atômica (evita corrida)
    if (cnpjDigits) {
      const jaExiste = await this.findEmpresaByCnpjAny(cnpjDigits);
      if (jaExiste) return jaExiste;
    }

    return await this.empresaRepo.save(novo);
  }

  return undefined;
}







  // ----------------- principal -----------------
  public async execute(args: ImportArgs): Promise<ImportResult> {
    const avisos: string[] = [];
    const erros: string[] = [];

        // 1) Lê o PDF por página
        const pages = await this.readPagesFromPdf(args.file);

        // 1.1) Descarta a última página (regra sua) e qualquer página que seja “Resumo…”
      const resumoRE =
  /(Resumo\s+de\s+Faturamento|Exames\s+Realizados|Total\s+Geral\s+da\s+Fatura|Quantidade\b|Valor\s+Unit[áa]rio|Valor\s+Total)/i;

        // Regra correta: mantenha TODAS as páginas que NÃO parecem resumo.
        // Se, por alguma exceção, todas forem filtradas, caia no “tira a última”.
        let usablePages = pages.filter(p => !resumoRE.test(p));
        if (usablePages.length === 0 && pages.length > 1) {
        usablePages = pages.slice(0, -1);
        }

        // 2) Empresa + Período da primeira página do PDF
      const rodape = this.extractCompanyFromText((usablePages[0] || pages[0] || ''));

      const empresa = await this.ensureEmpresa(rodape, args); // <- ESTA LINHA FALTAVA

        // 3) Texto útil para varrer exames
        const txt = usablePages.join('\n');

        // 4) Varre linhas de exames
        const parsed = this.scanExamRowsFromText(txt);



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

    // 5) Descobrir colunas reais de exameaso e aso (para inserts dinâmicos)
    const exameAsoColsRaw = await getManager().query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema='public' AND table_name='exameaso'
    `);
    const exameAsoCols = new Set((exameAsoColsRaw?.rows ?? exameAsoColsRaw).map((r: any) => r.column_name));
    const hasDataExame       = exameAsoCols.has('dataexame');
    const hasDataValidade    = exameAsoCols.has('datavalidadeexame');
    const hasDataCadastro    = exameAsoCols.has('data_cadastro_exame');
    const hasTipoPagamentoId = exameAsoCols.has('tipopagamento_id');

    const asoColsRaw = await getManager().query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_schema='public' AND table_name='aso'
    `);
    const asoCols = new Set((asoColsRaw?.rows ?? asoColsRaw).map((r: any) => r.column_name));
    const hasAsoTipoAsoId   = asoCols.has('tipoaso_id');
    const hasFuncaoId   = asoCols.has('funcao_id');
    const hasMedicoId   = asoCols.has('medico_id');
    const hasAsoEmpresaId   = asoCols.has('empresa_id');
    const hasAsoPacienteId  = asoCols.has('paciente_id');
    const hasAsoTpPagtoId   = asoCols.has('tipopagamento_id');
    const hasUserId   = asoCols.has('user_id');



    // 6) Transação para gravar
    let pacientesCriados = 0;
    let asosCriados = 0;
    let examesAsoInseridos = 0;
    let examesTiposCriados = 0;
    const allowCreatePac = args.allowCreatePacienteIfMissing !== false;

    const createdPacIds = new Set<string>();

    await getManager().transaction(async trx => {
      for (const rows of Array.from(group.values())) {
        const sample = rows[0];
        const cpf = sample.pacienteCpf;
        const nome = sample.pacienteNome;
        const dataBase = sample.dataExame || rodape?.periodoInicio || new Date();

        // tipo de ASO do bloco
        const rawTipoAso = rows.map(r => r.tipoAso).find(Boolean) || '';
        const tipoAsoId = this.mapTipoAsoToId(rawTipoAso);

        // Paciente
        const { pac, created } = await this.getOrCreatePaciente(trx, nome, cpf, empresa?.id, allowCreatePac);
        if (!pac) { avisos.push(`Paciente não encontrado e não criado (CPF ${cpf}). Bloco ignorado.`); continue; }
        if (created && pac.id) createdPacIds.add(pac.id);

        // ASO
        let asoId: string | undefined;
        if (args.dryRun) {
          asoId = 'dry-run-aso';
        } else {
          const asoColumns: string[] = ['user_edit','dataemissaoaso','resultado','transmissaoesocial','ativo'];
          const asoValues: any[] = ['import', dataBase, RESULTADO_OK,  false, true];

          if (hasAsoPacienteId) { asoColumns.push('paciente_id');      asoValues.push(pac.id); }
          if (hasAsoEmpresaId)  { asoColumns.push('empresa_id');       asoValues.push(empresa?.id || null); }
          if (hasAsoTpPagtoId)  { asoColumns.push('tipopagamento_id'); asoValues.push(CONVENIO_TIPOPAGAMENTO_ID); }
          if (hasAsoTipoAsoId)  { asoColumns.push('tipoaso_id');       asoValues.push(tipoAsoId); }
           if (hasFuncaoId)  { asoColumns.push('funcao_id');       asoValues.push(FUNCAO_ID); }
            if (hasMedicoId)  { asoColumns.push('medico_id');       asoValues.push(MEDICO_ID); }
               if (hasUserId)  { asoColumns.push('user_id');       asoValues.push(USER_ID); }

          asoColumns.push('created_at','updated_at');
          asoValues.push(new Date(), new Date());

          const placeholders = asoValues.map((_, i) => `$${i + 1}`).join(', ');
          const ret: any = await trx.query(
            `INSERT INTO public.aso (${asoColumns.join(', ')}) VALUES (${placeholders}) RETURNING id`,
            asoValues
          );
          const returnedId = Array.isArray(ret) ? ret[0]?.id : ret?.rows?.[0]?.id;
          if (!returnedId) throw new Error(`INSERT ASO não retornou id. Retorno: ${JSON.stringify(ret)}`);
          asoId = String(returnedId);
        }
        asosCriados++;

        // Exames
        for (const ex of rows) {
          const dataExame = ex.dataExame || dataBase;
          if (!ex.exameNome || !ex.exameNome.trim()) {
            avisos.push(`Linha ignorada: exame sem nome (CPF ${cpf}, ${dataExame?.toISOString().slice(0,10)})`);
            continue;
          }

          let examEntity = await this.findExameByNome(ex.exameNome);
          if (!examEntity) {
            examEntity = await this.ensureExameByNome(trx, ex.exameNome, ex.valor);
            examesTiposCriados++;
          }

          if (!args.dryRun) {
            const columns: string[] = [
              'aso_id','exame_id','ativo','desconto','valorexamesemdesconto','valorexame',
              'valormedico','valorems','user_desconto','created_at','updated_at',
            ];
            const values: any[] = [
              asoId, examEntity.id, true, true, ex.valor ?? 0, ex.valor ?? 0,
              0, 0, 'import', new Date(), new Date(),
            ];
            let insertPos = 2;
            if (hasDataExame)      { columns.splice(insertPos, 0, 'dataexame');         values.splice(insertPos, 0, dataExame); insertPos++; }
            if (hasDataValidade)   { columns.splice(insertPos, 0, 'datavalidadeexame'); values.splice(insertPos, 0, dataExame); insertPos++; }
            if (hasDataCadastro)   { columns.push('data_cadastro_exame'); values.push(dataExame); }
            if (hasTipoPagamentoId){
              const idxBeforeAudit = columns.indexOf('created_at');
              const insertIdx = idxBeforeAudit >= 0 ? idxBeforeAudit : columns.length;
              columns.splice(insertIdx, 0, 'tipopagamento_id');
              values.splice(insertIdx, 0, CONVENIO_TIPOPAGAMENTO_ID);
            }

            const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
            await trx.query(`INSERT INTO public.exameaso (${columns.join(', ')}) VALUES (${placeholders})`, values);
            examesAsoInseridos++;
          }
        }
      }
    });

    pacientesCriados = createdPacIds.size;

    return {
      empresa: empresa ? { id: (empresa as any).id, nome: (empresa as any).nome, cnpj: (empresa as any).cnpj } : null,
      periodo: rodape ? {
        inicio: rodape.periodoInicio?.toISOString().slice(0,10),
        fim: rodape.periodoFim?.toISOString().slice(0,10),
      } : null,
      contagens: {
        pacientesLidos: cpfsVistos.size,
        pacientesCriados,
        asosCriados,
        examesCriados: examesAsoInseridos,
        linhasIgnoradas,
        novosTiposExame: examesTiposCriados,
      },
      avisos, erros,
    };
  }
}
