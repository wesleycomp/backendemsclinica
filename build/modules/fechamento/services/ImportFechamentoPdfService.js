"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/fechamento/services/ImportFechamentoPdfService.ts
var typeorm_1 = require("typeorm");
// tipagem: crie src/types/pdf-parse.d.ts com `export = pdf;` conforme te passei
var pdf_parse_1 = __importDefault(require("pdf-parse"));
var Empresa_1 = __importDefault(require("@modules/empresa/typeorm/entities/Empresa"));
var Paciente_1 = __importDefault(require("@modules/paciente/typeorm/entities/Paciente"));
var Aso_1 = __importDefault(require("@modules/aso/typeorm/entities/Aso"));
var Exame_1 = __importDefault(require("@modules/exame/typeorm/entities/Exame"));
var ExamesAso_1 = __importDefault(require("@modules/aso/typeorm/entities/ExamesAso"));
var CONVENIO_TIPOPAGAMENTO_ID = '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a';
var RESULTADO_OK = true;
var ImportFechamentoPdfService = /** @class */ (function () {
    function ImportFechamentoPdfService() {
        this.empresaRepo = (0, typeorm_1.getRepository)(Empresa_1.default);
        this.pacienteRepo = (0, typeorm_1.getRepository)(Paciente_1.default);
        this.asoRepo = (0, typeorm_1.getRepository)(Aso_1.default);
        this.exameRepo = (0, typeorm_1.getRepository)(Exame_1.default);
        this.exameAsoRepo = (0, typeorm_1.getRepository)(ExamesAso_1.default);
    }
    // ---------- helpers ----------
    /** 11 dígitos -> 999.999.999-99; se não tiver 11, devolve a string original “trimada”. */
    ImportFechamentoPdfService.prototype.formatCpf = function (cpf) {
        var d = this.onlyDigits(cpf);
        if (d.length !== 11)
            return (cpf !== null && cpf !== void 0 ? cpf : '').trim();
        return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    };
    /** Procura paciente por CPF (com ou sem máscara) comparando por dígitos. */
    ImportFechamentoPdfService.prototype.findPacienteByCpfAny = function (manager, cpf) {
        return __awaiter(this, void 0, void 0, function () {
            var d;
            return __generator(this, function (_a) {
                d = this.onlyDigits(cpf);
                if (!d)
                    return [2 /*return*/, undefined];
                return [2 /*return*/, manager.getRepository(Paciente_1.default)
                        .createQueryBuilder('p')
                        .where("regexp_replace(coalesce(p.cpf, ''), '\\D', '', 'g') = :d", { d: d })
                        .getOne()];
            });
        });
    };
    /** 14 dígitos -> 99.999.999/9999-99; se não tiver 14, retorna string original “trimada”. */
    ImportFechamentoPdfService.prototype.formatCnpj = function (cnpj) {
        var d = this.onlyDigits(cnpj);
        if (d.length !== 14)
            return (cnpj !== null && cnpj !== void 0 ? cnpj : '').trim();
        return d.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    };
    /** Procura empresa por CNPJ (com ou sem máscara) comparando por dígitos. */
    ImportFechamentoPdfService.prototype.findEmpresaByCnpjAny = function (cnpj) {
        return __awaiter(this, void 0, void 0, function () {
            var d;
            return __generator(this, function (_a) {
                d = this.onlyDigits(cnpj);
                if (!d)
                    return [2 /*return*/, undefined];
                return [2 /*return*/, this.empresaRepo
                        .createQueryBuilder('e')
                        .where("regexp_replace(coalesce(e.cnpj, ''), '\\D', '', 'g') = :d", { d: d })
                        .getOne()];
            });
        });
    };
    /** Remove a seção "Resumo de Faturamento" (e similares) do texto. */
    ImportFechamentoPdfService.prototype.stripResumoDeFaturamento = function (txt) {
        var t = txt.replace(/\u00A0/g, ' ');
        // 1) procura pelo início típico do resumo
        var headerIdx = t.search(/\b(Resumo\s+de\s+Faturamento|Exames\s+Realizados)\b/i);
        if (headerIdx < 0)
            return txt;
        // 2) confirma que ali perto existem cabeçalhos de coluna do resumo
        var window = t.slice(headerIdx, headerIdx + 800); // janela curta após o header
        var hasCols = /\bQuantidade\b/i.test(window)
            || /\bValor\s+Unit[áa]rio\b/i.test(window)
            || /\bValor\s+Total\b/i.test(window)
            || /\bTotal\s+Geral\s+da\s+Fatura\b/i.test(window);
        return hasCols ? t.slice(0, headerIdx) : txt;
    };
    ImportFechamentoPdfService.prototype.scanExamRowsFromText = function (txt) {
        var _a;
        // garante que qualquer "Resumo..." remanescente seja removido
        txt = this.stripResumoDeFaturamento(txt);
        var raw = txt.split(/\r?\n/).map(function (l) {
            return l.replace(/\u00A0/g, ' ').replace(/[ \t]+/g, ' ').trim();
        });
        var lines = raw.filter(Boolean);
        var TIPOS = ['Admissional', 'Periódico', 'Periodico', 'Retorno', 'Retorno ao Trabalho', 'Demissional', 'Mudança de Função', 'Mudanca de Funcao'];
        var tipoRe = /(Admissional|Per[íi]odico|Retorno(?: ao Trabalho)?|Demissional|Mudan[çc]a de Fun[çc]ão)/i;
        var dateRe = /\b\d{2}\/\d{2}\/\d{4}\b/;
        var moneyRe = /\b(?:R\$\s*)?\d{1,3}(?:\.\d{3})*,\d{2}\b/;
        var normalize = function (s) { return s
            .replace(/(\d,\d{2})(?=\d{2}\/\d{2}\/\d{4})/g, '$1 ')
            .replace(/(Admissional|Demissional|Per[íi]odico|Retorno(?: ao Trabalho)?|Mudan[çc]a de Fun[çc]ão)(?=[A-Za-zÁ-Úá-ú])/g, '$1 ')
            .replace(/([A-Za-zÁ-Úá-ú])R\$/g, '$1 R$')
            .trim(); };
        var headerLine = function (s) {
            return /^(Relat[óo]rio\s+de\s+Faturamento\s+Mensal|Empresa\s*:|CNPJ\s*:|Fantasia\s*:|Per[ií]odo\s*:|Total\s+da\s+Fatura\s*:|Total\s+Geral\s+da\s+Fatura|Endere[çc]o\s*:|P[áa]gina\s+\d+\s+de\s+\d+|Resumo\s+de\s+Faturamento|Exames\s+Realizados)\b/i
                .test(s);
        };
        var rows = [];
        var currentCpf;
        var currentNome;
        for (var i = 0; i < lines.length; i++) {
            var line = normalize(lines[i]);
            if (headerLine(line)) {
                currentCpf = undefined;
                currentNome = undefined;
                continue;
            }
            // Funcionário + CPF na mesma linha
            var mFuncCpf = line.match(/Funcion[aá]rio\s*:?\s*(.+?)\s+CPF\s*:?\s*([\d.\-]+)/i);
            if (mFuncCpf) {
                currentNome = this.sanitizePacienteNome(mFuncCpf[1]);
                currentCpf = this.onlyDigits(mFuncCpf[2]);
                continue;
            }
            // Só Funcionário (CPF pode vir depois)
            var mFuncOnly = line.match(/Funcion[aá]rio\s*:?\s*(.+)$/i);
            if (mFuncOnly) {
                currentNome = this.sanitizePacienteNome(mFuncOnly[1]);
                continue;
            }
            // CPF em linha separada
            var mCpf = line.match(/\bCPF\s*:?\s*([\d.\-]+)/i) || line.match(/(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/);
            if (mCpf) {
                currentCpf = this.onlyDigits(mCpf[1] || mCpf[0]);
                continue;
            }
            // Cabeçalhos/totais
            if (/^Exame\b.*\bData\b.*\bTipo\b.*\bValor\b/i.test(line))
                continue;
            if (/^Exame\b.*\bValor\b.*\bData\b/i.test(line))
                continue;
            if (/^Fun[cç][aã]o\s*:/i.test(line))
                continue;
            if (/^Total\b/i.test(line))
                continue;
            if (!currentCpf)
                continue;
            // Linha + próxima (só se a próxima não for cabeçalho)
            var next = lines[i + 1] ? normalize(lines[i + 1]) : '';
            if (next && headerLine(next))
                next = '';
            var two = (line + (next ? ' ' + next : '')).trim();
            // limites (R$, valor, data)
            var dateMatch = two.match(dateRe);
            var moneyMatch = two.match(moneyRe);
            var idxDate = dateMatch ? two.indexOf(dateMatch[0]) : -1;
            var idxMoney = moneyMatch ? two.indexOf(moneyMatch[0]) : -1;
            var idxRS = two.indexOf('R$');
            var boundary = Number.MAX_SAFE_INTEGER;
            for (var _i = 0, _b = [idxRS, idxMoney, idxDate]; _i < _b.length; _i++) {
                var idx = _b[_i];
                if (idx >= 0 && idx < boundary)
                    boundary = idx;
            }
            if (boundary === Number.MAX_SAFE_INTEGER)
                continue;
            // texto à esquerda do primeiro token
            var left = two.slice(0, boundary).replace(/^Exame\s*:?/i, '').trim();
            // NÃO é exame se começa com rótulos de cabeçalho
            if (/^(Empresa|CNPJ|Fantasia|Per[ií]odo|Total\s+da\s+Fatura|Endere[çc]o)\s*:/i.test(left))
                continue;
            // Remove tipo colado no início
            if (left.toLowerCase().startsWith((((_a = left.match(tipoRe)) === null || _a === void 0 ? void 0 : _a[0]) || '').toLowerCase())) {
                left = left.replace(tipoRe, '').trim();
            }
            // Remove tipo separadinho no início
            left = left.replace(new RegExp('^' + tipoRe.source + '\\s+', 'i'), '').trim();
            var dataExame = idxDate >= 0 ? this.parseBrDate(dateMatch[0]) : undefined;
            var valor = moneyMatch ? this.parseBrMoney(moneyMatch[0]) : undefined;
            var exameNome = left
                .replace(/\s*R\$.*/i, '')
                .replace(/\s{2,}/g, ' ')
                .replace(/[:\-]\s*$/, '')
                .trim();
            if (!exameNome)
                continue;
            // Se o tipo vier depois da data
            var tipoAso = void 0;
            if (idxDate >= 0) {
                var afterDate = two.slice(idxDate);
                var m = afterDate.match(tipoRe);
                if (m)
                    tipoAso = m[0];
            }
            rows.push({ pacienteNome: currentNome, pacienteCpf: currentCpf, dataExame: dataExame, tipoAso: tipoAso, exameNome: exameNome, valor: valor });
            if (boundary >= line.length && next)
                i++;
        }
        return rows;
    };
    ImportFechamentoPdfService.prototype.norm = function (s) {
        return (s || '')
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .toUpperCase().replace(/\s+/g, ' ').trim();
    };
    ImportFechamentoPdfService.prototype.onlyDigits = function (s) { return (s || '').replace(/\D+/g, ''); };
    ImportFechamentoPdfService.prototype.parseBrMoney = function (s) {
        if (!s)
            return;
        var txt = s.replace(/\s|R\$/gi, '').replace(/\./g, '').replace(',', '.');
        var v = Number(txt);
        return Number.isFinite(v) ? v : undefined;
    };
    ImportFechamentoPdfService.prototype.parseBrDate = function (s) {
        if (!s)
            return;
        var m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (!m)
            return;
        var _ = m[0], dd = m[1], mm = m[2], yyyy = m[3];
        return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    };
    ImportFechamentoPdfService.prototype.sanitizePacienteNome = function (s) {
        if (!s)
            return;
        var t = s
            .replace(/\bfuncion[aá]rio\b/ig, '')
            .replace(/\bcolaborador(a)?\b/ig, '')
            .replace(/\bpaciente\b/ig, '')
            .replace(/\bnome\b/ig, '')
            .replace(/\bcpf\b/ig, '')
            .replace(/[:\-]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        var dup = t.match(/^(.+?)\s+\1$/i);
        if (dup)
            t = dup[1].trim();
        return t || undefined;
    };
    ImportFechamentoPdfService.prototype.readPagesFromPdf = function (buffer) {
        return __awaiter(this, void 0, void 0, function () {
            var pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pages = [];
                        return [4 /*yield*/, pdf_parse_1.default(buffer, {
                                pagerender: function (pageData) {
                                    // Pedimos os itens de texto sem serem colados
                                    var opts = { normalizeWhitespace: true, disableCombineTextItems: true };
                                    return pageData.getTextContent(opts).then(function (tc) {
                                        var items = (tc.items || []);
                                        var out = [];
                                        var buf = '';
                                        var lastY = null;
                                        // tolerância de variação vertical para "nova linha"
                                        var EPS = 2;
                                        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                                            var it = items_1[_i];
                                            var s = it.str || '';
                                            var tr = Array.isArray(it.transform) ? it.transform : [];
                                            var y = typeof tr[5] === 'number' ? Math.round(tr[5]) : null;
                                            if (lastY !== null && y !== null && Math.abs(y - lastY) > EPS) {
                                                // terminou a linha anterior
                                                out.push(buf.replace(/[ \t]+$/g, ''));
                                                buf = '';
                                            }
                                            buf += s + ' ';
                                            if (y !== null)
                                                lastY = y;
                                            // alguns PDFs marcam fim de linha
                                            if (it.hasEOL) {
                                                out.push(buf.replace(/[ \t]+$/g, ''));
                                                buf = '';
                                                lastY = null;
                                            }
                                        }
                                        if (buf.trim())
                                            out.push(buf.replace(/[ \t]+$/g, ''));
                                        var text = out
                                            .map(function (l) { return l.replace(/[ \t]{2,}/g, ' ').trim(); })
                                            .filter(Boolean)
                                            .join('\n');
                                        pages.push(text);
                                        return text; // o pdf-parse usa isso para res.text (não utilizamos)
                                    });
                                },
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, pages];
                }
            });
        });
    };
    /** Extrai CNPJ, período e NOME da empresa apenas do cabeçalho da 1ª página. */
    ImportFechamentoPdfService.prototype.extractCompanyFromText = function (txt) {
        var _a, _b, _c;
        var out = {};
        var t = (txt || '').replace(/\u00A0/g, ' ').replace(/[ \t]+/g, ' ').trim();
        // Delimita o "cabeçalho": do início até antes do primeiro bloco de dados
        var stopMarkers = [
            'Funcionário', 'Funcionario', 'Exame', 'Resumo de Faturamento',
            'Exames Realizados', 'Página', 'Pagina', 'Total da Fatura'
        ];
        var cut = t.length;
        for (var _i = 0, stopMarkers_1 = stopMarkers; _i < stopMarkers_1.length; _i++) {
            var m = stopMarkers_1[_i];
            var idx = t.search(new RegExp("\\b".concat(m, "\\b"), 'i'));
            if (idx >= 0 && idx < cut)
                cut = idx;
        }
        var head = t.slice(0, cut);
        // CNPJ
        var cnpj = (_a = head.match(/\bCNPJ\s*:?\s*([\d.\-\/]{14,18})/i)) === null || _a === void 0 ? void 0 : _a[1];
        if (cnpj)
            out.cnpj = this.onlyDigits(cnpj);
        // Período
        var per = head.match(/\bPer[ií]odo(?:\s*de)?\s*:?\s*(\d{2}\/\d{2}\/\d{4})\s*(?:a|até|ate)\s*(\d{2}\/\d{2}\/\d{4})/i);
        if (per) {
            out.periodoInicio = this.parseBrDate(per[1]);
            out.periodoFim = this.parseBrDate(per[2]);
        }
        // Nome da empresa
        // 1) Se existir "Empresa:", pega até o próximo rótulo conhecido
        var emp1 = (_b = head.match(/\bEmpresa\s*:?\s*(?:\d+\s*[-–]\s*)?(.+?)(?=\s+(?:CNPJ|Per[ií]odo|Fantasia|Endere[çc]o|Total\s+da\s+Fatura|P[áa]gina|Resumo\s+de\s+Faturamento)\b)/i)) === null || _b === void 0 ? void 0 : _b[1];
        // 2) Fallback: frase com sufixo societário no cabeçalho (sem rótulo)
        var suffix = '(?:LTDA|L\\.?T\\.?D\\.?A\\.?|EIRELI|EPP|ME|MEI|S\\.?A\\.?|S\\/A)';
        var emp2 = (_c = head.match(new RegExp("\\b([A-Z\u00C1-\u00DA0-9][A-Z\u00C1-\u00DA0-9\\s\\.,&\\-\\/']*?".concat(suffix, ")\\b"), 'i'))) === null || _c === void 0 ? void 0 : _c[1];
        var nome = (emp1 || emp2 || '')
            .replace(/^\d+\s*[-–]\s*/, '') // remove "19826 - "
            .replace(/\s{2,}/g, ' ')
            .trim();
        if (nome)
            out.nome = nome;
        return (out.cnpj || out.nome) ? out : undefined;
    };
    ImportFechamentoPdfService.prototype.ensureExameByNome = function (manager, nome, valor) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var repo, cols, candidates, where, found, _e, q, isProcNullable, procedimento_id, any, row, novo;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        repo = manager.getRepository(Exame_1.default);
                        cols = repo.metadata.columns.map(function (c) { return c.propertyName; });
                        candidates = ['name', 'nome', 'descricao', 'titulo'];
                        where = candidates.filter(function (c) { return cols.includes(c); }).map(function (p) {
                            var _a;
                            return (_a = {}, _a[p] = (0, typeorm_1.ILike)(nome.trim()), _a);
                        });
                        if (!where.length) return [3 /*break*/, 2];
                        return [4 /*yield*/, repo.findOne({ where: where })];
                    case 1:
                        _e = _f.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        _e = undefined;
                        _f.label = 3;
                    case 3:
                        found = _e;
                        if (found)
                            return [2 /*return*/, found];
                        return [4 /*yield*/, manager.query("\n      SELECT is_nullable\n      FROM information_schema.columns\n      WHERE table_schema='public' AND table_name='exame' AND column_name='procedimento_id'\n    ")];
                    case 4:
                        q = _f.sent();
                        isProcNullable = ((_c = (_b = ((_a = q === null || q === void 0 ? void 0 : q.rows) !== null && _a !== void 0 ? _a : q)[0]) === null || _b === void 0 ? void 0 : _b.is_nullable) !== null && _c !== void 0 ? _c : '').toString().toUpperCase() === 'YES';
                        procedimento_id = null;
                        if (!!isProcNullable) return [3 /*break*/, 6];
                        return [4 /*yield*/, manager.query("SELECT id FROM public.procedimentos LIMIT 1")];
                    case 5:
                        any = _f.sent();
                        row = ((_d = any === null || any === void 0 ? void 0 : any.rows) !== null && _d !== void 0 ? _d : any)[0];
                        if (!(row === null || row === void 0 ? void 0 : row.id))
                            throw new Error('Não foi possível criar Exame: sem procedimento disponível.');
                        procedimento_id = row.id;
                        _f.label = 6;
                    case 6:
                        novo = repo.create({
                            name: nome.trim(),
                            procedimento_id: procedimento_id,
                            valoravista: valor !== null && valor !== void 0 ? valor : 0,
                            valormedico: 0,
                            valorems: 0,
                            ativo: true,
                            localrealizacaoexame: 'IMPORT',
                            usuariocadastro: 'import',
                            usuarioedicao: 'import',
                        });
                        return [2 /*return*/, repo.save(novo)];
                }
            });
        });
    };
    ImportFechamentoPdfService.prototype.findExameByNome = function (nome) {
        return __awaiter(this, void 0, void 0, function () {
            var cols, candidates, where;
            return __generator(this, function (_a) {
                if (!nome)
                    return [2 /*return*/, undefined];
                cols = this.exameRepo.metadata.columns.map(function (c) { return c.propertyName; });
                candidates = ['name', 'nome', 'descricao', 'titulo'];
                where = candidates.filter(function (c) { return cols.includes(c); }).map(function (p) {
                    var _a;
                    return (_a = {}, _a[p] = (0, typeorm_1.ILike)(nome.trim()), _a);
                });
                if (!where.length)
                    return [2 /*return*/, undefined];
                return [2 /*return*/, this.exameRepo.findOne({ where: where })];
            });
        });
    };
    ImportFechamentoPdfService.prototype.getOrCreatePaciente = function (manager, nome, cpf, empresaId, allowCreate) {
        return __awaiter(this, void 0, void 0, function () {
            var cpfDigits, repo, found, now, novo, saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cpfDigits = this.onlyDigits(cpf);
                        if (!cpfDigits)
                            return [2 /*return*/, { pac: undefined, created: false }];
                        repo = manager.getRepository(Paciente_1.default);
                        return [4 /*yield*/, this.findPacienteByCpfAny(manager, cpfDigits)];
                    case 1:
                        found = _a.sent();
                        if (!found) return [3 /*break*/, 4];
                        // vincula empresa se estiver faltando
                        if (!found.empresa_id && empresaId) {
                            found.empresa_id = empresaId;
                        }
                        // (opcional) normaliza máscara se no banco estiver sem máscara
                        if (this.onlyDigits(found.cpf).length === 11 && !/[.\-]/.test(found.cpf)) {
                            found.cpf = this.formatCpf(found.cpf);
                        }
                        if (!(!found.empresa_id || !/[.\-]/.test(found.cpf))) return [3 /*break*/, 3];
                        return [4 /*yield*/, repo.save(found)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, { pac: found, created: false }];
                    case 4:
                        // 2) Não criar?
                        if (!allowCreate)
                            return [2 /*return*/, { pac: undefined, created: false }];
                        now = new Date();
                        novo = repo.create({
                            nome: nome || 'PACIENTE (import)',
                            cpf: this.formatCpf(cpfDigits),
                            empresa_id: empresaId || null,
                            matricula: 'IMPORT',
                            dataentradaempresa: now,
                            descricaoatividade: 'IMPORTADO',
                            rg: 'ISENTO',
                            telefone: '00000000000',
                            ctps: 'ISENTO',
                            datanascimento: new Date(1970, 0, 1),
                            email: "import+".concat(cpfDigits, "@local.test"),
                        });
                        return [4 /*yield*/, repo.save(novo)];
                    case 5:
                        saved = _a.sent();
                        return [2 /*return*/, { pac: saved, created: true }];
                }
            });
        });
    };
    ImportFechamentoPdfService.prototype.ensureEmpresa = function (rodape, args) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var e, cnpjInput, cnpjDigits, e, nomeClean, e, novo, jaExiste;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!args.empresaId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.empresaRepo.findOne(args.empresaId)];
                    case 1:
                        e = _c.sent();
                        if (e)
                            return [2 /*return*/, e];
                        _c.label = 2;
                    case 2:
                        cnpjInput = (_a = args.empresaCnpj) !== null && _a !== void 0 ? _a : rodape === null || rodape === void 0 ? void 0 : rodape.cnpj;
                        cnpjDigits = this.onlyDigits(cnpjInput);
                        if (!cnpjDigits) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.findEmpresaByCnpjAny(cnpjDigits)];
                    case 3:
                        e = _c.sent();
                        if (e)
                            return [2 /*return*/, e];
                        _c.label = 4;
                    case 4:
                        if (!(rodape === null || rodape === void 0 ? void 0 : rodape.nome)) return [3 /*break*/, 6];
                        nomeClean = rodape.nome.replace(/\s+/g, ' ').trim();
                        return [4 /*yield*/, this.empresaRepo.findOne({ where: { nome: (0, typeorm_1.ILike)(nomeClean) } })];
                    case 5:
                        e = _c.sent();
                        if (e)
                            return [2 /*return*/, e];
                        _c.label = 6;
                    case 6:
                        if (!(((rodape === null || rodape === void 0 ? void 0 : rodape.nome) || cnpjDigits) && ((_b = args.allowCreateEmpresaIfMissing) !== null && _b !== void 0 ? _b : true))) return [3 /*break*/, 10];
                        novo = this.empresaRepo.create({
                            nome: (rodape === null || rodape === void 0 ? void 0 : rodape.nome) || 'EMPRESA (import)',
                            // salva sempre mascarado; se faltar CNPJ, salva vazio mascarado “00…00”
                            cnpj: this.formatCnpj(cnpjDigits || '00000000000000'),
                            esocial: false,
                            convenio: true,
                        });
                        if (args.dryRun)
                            return [2 /*return*/, novo];
                        if (!cnpjDigits) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.findEmpresaByCnpjAny(cnpjDigits)];
                    case 7:
                        jaExiste = _c.sent();
                        if (jaExiste)
                            return [2 /*return*/, jaExiste];
                        _c.label = 8;
                    case 8: return [4 /*yield*/, this.empresaRepo.save(novo)];
                    case 9: return [2 /*return*/, _c.sent()];
                    case 10: return [2 /*return*/, undefined];
                }
            });
        });
    };
    // ----------------- principal -----------------
    ImportFechamentoPdfService.prototype.execute = function (args) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var avisos, erros, pages, resumoRE, usablePages, rodape, empresa, txt, parsed, group, cpfsVistos, linhasIgnoradas, _i, parsed_1, row, cpfDigits, d, key, exameAsoColsRaw, exameAsoCols, hasDataExame, hasDataValidade, hasDataCadastro, hasTipoPagamentoId, asoColsRaw, asoCols, hasAsoTipoAsoId, hasAsoEmpresaId, hasAsoPacienteId, hasAsoTpPagtoId, tipoAsoRows, tipoAsoMap, _f, _g, r, pacientesCriados, asosCriados, examesAsoInseridos, examesTiposCriados, allowCreatePac, createdPacIds;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        avisos = [];
                        erros = [];
                        return [4 /*yield*/, this.readPagesFromPdf(args.file)];
                    case 1:
                        pages = _h.sent();
                        resumoRE = /(Resumo\s+de\s+Faturamento|Exames\s+Realizados|Total\s+Geral\s+da\s+Fatura|Quantidade\b|Valor\s+Unit[áa]rio|Valor\s+Total)/i;
                        usablePages = pages.filter(function (p) { return !resumoRE.test(p); });
                        if (usablePages.length === 0 && pages.length > 1) {
                            usablePages = pages.slice(0, -1);
                        }
                        rodape = this.extractCompanyFromText((usablePages[0] || pages[0] || ''));
                        return [4 /*yield*/, this.ensureEmpresa(rodape, args)];
                    case 2:
                        empresa = _h.sent();
                        txt = usablePages.join('\n');
                        parsed = this.scanExamRowsFromText(txt);
                        group = new Map();
                        cpfsVistos = new Set();
                        linhasIgnoradas = 0;
                        for (_i = 0, parsed_1 = parsed; _i < parsed_1.length; _i++) {
                            row = parsed_1[_i];
                            if (!row.pacienteCpf) {
                                linhasIgnoradas++;
                                continue;
                            }
                            cpfDigits = this.onlyDigits(row.pacienteCpf);
                            cpfsVistos.add(cpfDigits);
                            d = row.dataExame || (rodape === null || rodape === void 0 ? void 0 : rodape.periodoInicio) || new Date();
                            key = "".concat(cpfDigits, "|").concat(d.toISOString().slice(0, 10));
                            if (!group.has(key))
                                group.set(key, []);
                            group.get(key).push(row);
                        }
                        return [4 /*yield*/, (0, typeorm_1.getManager)().query("\n      SELECT column_name\n      FROM information_schema.columns\n      WHERE table_schema='public' AND table_name='exameaso'\n    ")];
                    case 3:
                        exameAsoColsRaw = _h.sent();
                        exameAsoCols = new Set(((_a = exameAsoColsRaw === null || exameAsoColsRaw === void 0 ? void 0 : exameAsoColsRaw.rows) !== null && _a !== void 0 ? _a : exameAsoColsRaw).map(function (r) { return r.column_name; }));
                        hasDataExame = exameAsoCols.has('dataexame');
                        hasDataValidade = exameAsoCols.has('datavalidadeexame');
                        hasDataCadastro = exameAsoCols.has('data_cadastro_exame');
                        hasTipoPagamentoId = exameAsoCols.has('tipopagamento_id');
                        return [4 /*yield*/, (0, typeorm_1.getManager)().query("\n      SELECT column_name\n      FROM information_schema.columns\n      WHERE table_schema='public' AND table_name='aso'\n    ")];
                    case 4:
                        asoColsRaw = _h.sent();
                        asoCols = new Set(((_b = asoColsRaw === null || asoColsRaw === void 0 ? void 0 : asoColsRaw.rows) !== null && _b !== void 0 ? _b : asoColsRaw).map(function (r) { return r.column_name; }));
                        hasAsoTipoAsoId = asoCols.has('tipoaso_id');
                        hasAsoEmpresaId = asoCols.has('empresa_id');
                        hasAsoPacienteId = asoCols.has('paciente_id');
                        hasAsoTpPagtoId = asoCols.has('tipopagamento_id');
                        return [4 /*yield*/, (0, typeorm_1.getManager)().query("SELECT id, descricao FROM public.tipoaso")];
                    case 5:
                        tipoAsoRows = _h.sent();
                        tipoAsoMap = new Map();
                        for (_f = 0, _g = ((_c = tipoAsoRows === null || tipoAsoRows === void 0 ? void 0 : tipoAsoRows.rows) !== null && _c !== void 0 ? _c : tipoAsoRows); _f < _g.length; _f++) {
                            r = _g[_f];
                            tipoAsoMap.set(this.norm(r.descricao), r.id);
                        }
                        pacientesCriados = 0;
                        asosCriados = 0;
                        examesAsoInseridos = 0;
                        examesTiposCriados = 0;
                        allowCreatePac = args.allowCreatePacienteIfMissing !== false;
                        createdPacIds = new Set();
                        return [4 /*yield*/, (0, typeorm_1.getManager)().transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var _i, _a, rows, sample, cpf, nome, dataBase, rawTipoAso, tipoKey, tipoAsoId, _b, pac, created, asoId, asoColumns, asoValues, placeholders, ret, returnedId, _c, rows_1, ex, dataExame, examEntity, columns, values, insertPos, idxBeforeAudit, insertIdx, placeholders;
                                var _d, _e, _f, _g, _h;
                                return __generator(this, function (_j) {
                                    switch (_j.label) {
                                        case 0:
                                            _i = 0, _a = Array.from(group.values());
                                            _j.label = 1;
                                        case 1:
                                            if (!(_i < _a.length)) return [3 /*break*/, 13];
                                            rows = _a[_i];
                                            sample = rows[0];
                                            cpf = sample.pacienteCpf;
                                            nome = sample.pacienteNome;
                                            dataBase = sample.dataExame || (rodape === null || rodape === void 0 ? void 0 : rodape.periodoInicio) || new Date();
                                            rawTipoAso = rows.map(function (r) { return r.tipoAso; }).find(Boolean) || '';
                                            tipoKey = this.norm(rawTipoAso);
                                            if (tipoKey === 'RETORNO')
                                                tipoKey = 'RETORNO AO TRABALHO';
                                            tipoAsoId = tipoAsoMap.get(tipoKey) || null;
                                            return [4 /*yield*/, this.getOrCreatePaciente(trx, nome, cpf, empresa === null || empresa === void 0 ? void 0 : empresa.id, allowCreatePac)];
                                        case 2:
                                            _b = _j.sent(), pac = _b.pac, created = _b.created;
                                            if (!pac) {
                                                avisos.push("Paciente n\u00E3o encontrado e n\u00E3o criado (CPF ".concat(cpf, "). Bloco ignorado."));
                                                return [3 /*break*/, 12];
                                            }
                                            if (created && pac.id)
                                                createdPacIds.add(pac.id);
                                            asoId = void 0;
                                            if (!args.dryRun) return [3 /*break*/, 3];
                                            asoId = 'dry-run-aso';
                                            return [3 /*break*/, 5];
                                        case 3:
                                            asoColumns = ['user_edit', 'dataemissaoaso', 'resultado', 'temexames', 'transmissaoesocial', 'ativo'];
                                            asoValues = ['import', dataBase, RESULTADO_OK, true, false, true];
                                            if (hasAsoPacienteId) {
                                                asoColumns.push('paciente_id');
                                                asoValues.push(pac.id);
                                            }
                                            if (hasAsoEmpresaId) {
                                                asoColumns.push('empresa_id');
                                                asoValues.push((empresa === null || empresa === void 0 ? void 0 : empresa.id) || null);
                                            }
                                            if (hasAsoTpPagtoId) {
                                                asoColumns.push('tipopagamento_id');
                                                asoValues.push(CONVENIO_TIPOPAGAMENTO_ID);
                                            }
                                            if (hasAsoTipoAsoId) {
                                                asoColumns.push('tipoaso_id');
                                                asoValues.push(tipoAsoId);
                                            }
                                            asoColumns.push('created_at', 'updated_at');
                                            asoValues.push(new Date(), new Date());
                                            placeholders = asoValues.map(function (_, i) { return "$".concat(i + 1); }).join(', ');
                                            return [4 /*yield*/, trx.query("INSERT INTO public.aso (".concat(asoColumns.join(', '), ") VALUES (").concat(placeholders, ") RETURNING id"), asoValues)];
                                        case 4:
                                            ret = _j.sent();
                                            returnedId = Array.isArray(ret) ? (_d = ret[0]) === null || _d === void 0 ? void 0 : _d.id : (_f = (_e = ret === null || ret === void 0 ? void 0 : ret.rows) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.id;
                                            if (!returnedId)
                                                throw new Error("INSERT ASO n\u00E3o retornou id. Retorno: ".concat(JSON.stringify(ret)));
                                            asoId = String(returnedId);
                                            _j.label = 5;
                                        case 5:
                                            asosCriados++;
                                            _c = 0, rows_1 = rows;
                                            _j.label = 6;
                                        case 6:
                                            if (!(_c < rows_1.length)) return [3 /*break*/, 12];
                                            ex = rows_1[_c];
                                            dataExame = ex.dataExame || dataBase;
                                            if (!ex.exameNome || !ex.exameNome.trim()) {
                                                avisos.push("Linha ignorada: exame sem nome (CPF ".concat(cpf, ", ").concat(dataExame === null || dataExame === void 0 ? void 0 : dataExame.toISOString().slice(0, 10), ")"));
                                                return [3 /*break*/, 11];
                                            }
                                            return [4 /*yield*/, this.findExameByNome(ex.exameNome)];
                                        case 7:
                                            examEntity = _j.sent();
                                            if (!!examEntity) return [3 /*break*/, 9];
                                            return [4 /*yield*/, this.ensureExameByNome(trx, ex.exameNome, ex.valor)];
                                        case 8:
                                            examEntity = _j.sent();
                                            examesTiposCriados++;
                                            _j.label = 9;
                                        case 9:
                                            if (!!args.dryRun) return [3 /*break*/, 11];
                                            columns = [
                                                'aso_id', 'exame_id', 'ativo', 'desconto', 'valorexamesemdesconto', 'valorexame',
                                                'valormedico', 'valorems', 'user_desconto', 'created_at', 'updated_at',
                                            ];
                                            values = [
                                                asoId, examEntity.id, true, true,
                                                (_g = ex.valor) !== null && _g !== void 0 ? _g : 0,
                                                (_h = ex.valor) !== null && _h !== void 0 ? _h : 0,
                                                0, 0, 'import', new Date(), new Date(),
                                            ];
                                            insertPos = 2;
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
                                            if (hasTipoPagamentoId) {
                                                idxBeforeAudit = columns.indexOf('created_at');
                                                insertIdx = idxBeforeAudit >= 0 ? idxBeforeAudit : columns.length;
                                                columns.splice(insertIdx, 0, 'tipopagamento_id');
                                                values.splice(insertIdx, 0, CONVENIO_TIPOPAGAMENTO_ID);
                                            }
                                            placeholders = values.map(function (_, i) { return "$".concat(i + 1); }).join(', ');
                                            return [4 /*yield*/, trx.query("INSERT INTO public.exameaso (".concat(columns.join(', '), ") VALUES (").concat(placeholders, ")"), values)];
                                        case 10:
                                            _j.sent();
                                            examesAsoInseridos++;
                                            _j.label = 11;
                                        case 11:
                                            _c++;
                                            return [3 /*break*/, 6];
                                        case 12:
                                            _i++;
                                            return [3 /*break*/, 1];
                                        case 13: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 6:
                        _h.sent();
                        pacientesCriados = createdPacIds.size;
                        return [2 /*return*/, {
                                empresa: empresa ? { id: empresa.id, nome: empresa.nome, cnpj: empresa.cnpj } : null,
                                periodo: rodape ? {
                                    inicio: (_d = rodape.periodoInicio) === null || _d === void 0 ? void 0 : _d.toISOString().slice(0, 10),
                                    fim: (_e = rodape.periodoFim) === null || _e === void 0 ? void 0 : _e.toISOString().slice(0, 10),
                                } : null,
                                contagens: {
                                    pacientesLidos: cpfsVistos.size,
                                    pacientesCriados: pacientesCriados,
                                    asosCriados: asosCriados,
                                    examesCriados: examesAsoInseridos,
                                    linhasIgnoradas: linhasIgnoradas,
                                    novosTiposExame: examesTiposCriados,
                                },
                                avisos: avisos,
                                erros: erros,
                            }];
                }
            });
        });
    };
    return ImportFechamentoPdfService;
}());
exports.default = ImportFechamentoPdfService;
