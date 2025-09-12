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
// src/modules/fechamento/services/ImportFechamentoExcelService.ts
var exceljs_1 = __importDefault(require("exceljs"));
var typeorm_1 = require("typeorm");
// ========= AJUSTE OS CAMINHOS CONFORME SUA ÁRVORE =========
var Empresa_1 = __importDefault(require("@modules/empresa/typeorm/entities/Empresa"));
var Paciente_1 = __importDefault(require("@modules/paciente/typeorm/entities/Paciente"));
var Aso_1 = __importDefault(require("@modules/aso/typeorm/entities/Aso"));
var Exame_1 = __importDefault(require("@modules/exame/typeorm/entities/Exame"));
var ExamesAso_1 = __importDefault(require("@modules/aso/typeorm/entities/ExamesAso"));
// ===========================================================
var CONVENIO_TIPOPAGAMENTO_ID = '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a';
var RESULTADO_OK = 'APTO';
var ImportFechamentoExcelService = /** @class */ (function () {
    function ImportFechamentoExcelService() {
        this.empresaRepo = (0, typeorm_1.getRepository)(Empresa_1.default);
        this.pacienteRepo = (0, typeorm_1.getRepository)(Paciente_1.default);
        this.asoRepo = (0, typeorm_1.getRepository)(Aso_1.default);
        this.exameRepo = (0, typeorm_1.getRepository)(Exame_1.default);
        this.exameAsoRepo = (0, typeorm_1.getRepository)(ExamesAso_1.default);
    }
    // ----------------- helpers -----------------
    /** Normaliza texto (remove acento, caixa, espaços) p/ comparar descrições. */
    ImportFechamentoExcelService.prototype.norm = function (s) {
        return (s || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toUpperCase()
            .replace(/\s+/g, ' ')
            .trim();
    };
    ImportFechamentoExcelService.prototype.ensureExameByNome = function (manager, nome, valor) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var repo, cols, candidates, where, found, _e, q, isProcNullable, procedimento_id, any, row, novo;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        repo = manager.getRepository(Exame_1.default);
                        cols = repo.metadata.columns.map(function (c) { return c.propertyName; });
                        candidates = ['name', 'nome', 'descricao', 'titulo'];
                        where = candidates.filter(function (c) { return cols.includes(c); })
                            .map(function (p) {
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
                        return [4 /*yield*/, manager.query("\n    SELECT is_nullable\n    FROM information_schema.columns\n    WHERE table_schema='public' AND table_name='exame' AND column_name='procedimento_id'\n  ")];
                    case 4:
                        q = _f.sent();
                        isProcNullable = ((_c = (_b = ((_a = q === null || q === void 0 ? void 0 : q.rows) !== null && _a !== void 0 ? _a : q)[0]) === null || _b === void 0 ? void 0 : _b.is_nullable) !== null && _c !== void 0 ? _c : '').toString().toUpperCase() === 'YES';
                        procedimento_id = null;
                        if (!!isProcNullable) return [3 /*break*/, 6];
                        return [4 /*yield*/, manager.query("SELECT id FROM public.procedimentos LIMIT 1")];
                    case 5:
                        any = _f.sent();
                        row = ((_d = any === null || any === void 0 ? void 0 : any.rows) !== null && _d !== void 0 ? _d : any)[0];
                        if (!(row === null || row === void 0 ? void 0 : row.id)) {
                            throw new Error('Não foi possível criar Exame: exame.procedimento_id é NOT NULL e não há registros em "procedimentos".');
                        }
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
    ImportFechamentoExcelService.prototype.onlyDigits = function (s) { return (s || '').replace(/\D+/g, ''); };
    ImportFechamentoExcelService.prototype.parseBrMoney = function (s) {
        if (!s)
            return;
        var txt = s.replace(/\s|R\$/gi, '').replace(/\./g, '').replace(',', '.');
        var v = Number(txt);
        return Number.isFinite(v) ? v : undefined;
    };
    ImportFechamentoExcelService.prototype.parseBrDate = function (s) {
        if (!s)
            return;
        var m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
        if (!m)
            return;
        var _ = m[0], dd = m[1], mm = m[2], yyyy = m[3];
        return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    };
    /** Remove "Funcionário", "CPF", sinais e duplicação exata do nome. */
    ImportFechamentoExcelService.prototype.sanitizePacienteNome = function (s) {
        if (!s)
            return;
        var t = s
            .replace(/\bfuncion[aá]rio\b/ig, '') // Funcionário / Funcionaria
            .replace(/\bcolaborador(a)?\b/ig, '') // (se aparecer)
            .replace(/\bpaciente\b/ig, '') // "Paciente"
            .replace(/\bnome\b/ig, '') // "Nome"
            .replace(/\bcpf\b/ig, '') // "CPF"
            .replace(/[:\-]/g, ' ') // separadores
            .replace(/\s+/g, ' ') // espaços
            .trim();
        // Se a frase for repetida duas vezes (ex.: "NOME NOME"), mantém uma vez só
        var dup = t.match(/^(.+?)\s+\1$/i);
        if (dup)
            t = dup[1].trim();
        return t || undefined;
    };
    /** Lê conteúdo de célula ExcelJS de forma segura (merge/richText/formula). */
    ImportFechamentoExcelService.prototype.cellText = function (cell) {
        try {
            var v = cell === null || cell === void 0 ? void 0 : cell.value;
            if (v == null)
                return '';
            if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') {
                return String(v);
            }
            if (v instanceof Date) {
                var dd = String(v.getDate()).padStart(2, '0');
                var mm = String(v.getMonth() + 1).padStart(2, '0');
                var yyyy = v.getFullYear();
                return "".concat(dd, "/").concat(mm, "/").concat(yyyy);
            }
            if (typeof v === 'object' && Array.isArray(v.richText)) {
                return v.richText.map(function (rt) { var _a; return (_a = rt === null || rt === void 0 ? void 0 : rt.text) !== null && _a !== void 0 ? _a : ''; }).join('');
            }
            if (v.text)
                return String(v.text);
            if (v.result != null)
                return String(v.result);
            if (typeof v.toString === 'function')
                return v.toString();
            return '';
        }
        catch (_a) {
            return '';
        }
    };
    ImportFechamentoExcelService.prototype.rowJoin = function (ws, r, maxCols) {
        if (maxCols === void 0) { maxCols = 30; }
        var parts = [];
        var cols = Math.min(ws.columnCount || maxCols, maxCols);
        for (var c = 1; c <= cols; c++) {
            var t = this.cellText(ws.getCell(r, c)).trim();
            if (t)
                parts.push(t);
        }
        return parts.join(' ');
    };
    /** Extrai o texto entre "Empresa:" e "Período:" (ou "Periodo:"), incluindo quebras de linha. */
    ImportFechamentoExcelService.prototype.betweenEmpresaPeriodo = function (block) {
        var m = block.match(/empresa\s*:\s*([\s\S]*?)\bperi[oó]do\s*:/i);
        if (!m)
            return;
        // limpa "48326 - " e espaços extras
        var nome = m[1]
            .replace(/^\s*\d+\s*[-–]\s*/i, '') // remove código + traço
            .replace(/\s+/g, ' ')
            .trim();
        return nome || undefined;
    };
    ImportFechamentoExcelService.prototype.extractCompanyFromFooter = function (ws) {
        var _this = this;
        var out = {};
        var read = function (r) { return _this.rowJoin(ws, r); };
        // função auxiliar: se "Período:" não aparecer, corta por outros marcadores
        var parseEmpresaFromBlock = function (block) {
            var _a;
            var txt = (((_a = block.match(/empresa\s*:\s*([\s\S]*?)$/i)) === null || _a === void 0 ? void 0 : _a[1]) || '').trim();
            // corta no primeiro marcador pós-nome
            txt = (txt.split(/peri[oó]do\b|total\s+da\s+fatura\b|endere[cç]o\b|cnpj\b|resumo\b|exames\s+realizados\b/i)[0] || txt).trim();
            // remove "12345 - " do início e normaliza espaços
            txt = txt.replace(/^\s*\d+\s*[-–]\s*/i, '').replace(/\s+/g, ' ').trim();
            return txt || undefined;
        };
        // ============ PASSO 1: varre de baixo pra cima ============
        var start = Math.max(1, ws.rowCount - 300);
        for (var r = ws.rowCount; r >= start; r--) {
            var line = read(r);
            if (!line)
                continue;
            // CNPJ
            if (!out.cnpj && /cnpj/i.test(line)) {
                var m = line.match(/(\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2})/);
                if (m)
                    out.cnpj = this.onlyDigits(m[1]);
            }
            // Período
            if (!out.periodoInicio && /peri[oó]do/i.test(line)) {
                var mm = line.match(/(\d{2}\/\d{2}\/\d{4}).*?(\d{2}\/\d{2}\/\d{4})/);
                if (mm) {
                    out.periodoInicio = this.parseBrDate(mm[1]);
                    out.periodoFim = this.parseBrDate(mm[2]);
                }
            }
            // Empresa
            if (!out.nome && /empresa\s*:/i.test(line)) {
                var block = line;
                for (var k = 1; k <= 8; k++) {
                    var nxt = read(r + k);
                    if (nxt)
                        block += '\n' + nxt;
                }
                // tenta: (Empresa: ... Período:) e, se não achar, fallback
                var nome = this.betweenEmpresaPeriodo(block) || parseEmpresaFromBlock(block);
                if (nome)
                    out.nome = nome;
            }
            if (out.nome && out.cnpj && out.periodoInicio)
                break;
        }
        // ============ PASSO 2: fallback do topo (corrigido) ============
        if (!out.nome) {
            var top_1 = Math.min(120, ws.rowCount);
            for (var r = 1; r <= top_1; r++) {
                var line = read(r);
                if (!line)
                    continue;
                if (/empresa\s*:/i.test(line)) {
                    var block = line;
                    for (var k = 1; k <= 8; k++) {
                        var nxt = read(r + k);
                        if (nxt)
                            block += '\n' + nxt;
                    }
                    var nome = this.betweenEmpresaPeriodo(block) || parseEmpresaFromBlock(block);
                    if (nome) {
                        out.nome = nome;
                        break;
                    }
                }
            }
        }
        if (!out.cnpj && !out.nome)
            return;
        return out;
    };
    ImportFechamentoExcelService.prototype.scanExamRows = function (ws) {
        var _this = this;
        var rows = [];
        var currentCpf;
        var currentNome;
        // <- LISTA + normalização (inclui "Retorno ao Trabalho")
        var TIPOS = [
            'Admissional',
            'Periódico',
            'Periodico',
            'Retorno',
            'Retorno ao Trabalho',
            'Demissional',
            'Mudança de Função',
            'Mudanca de Funcao',
        ];
        var TIPOS_NORM = new Set(TIPOS.map(function (t) { return _this.norm(t); }));
        var moneyRegex = /(^R\$\s*)?\d{1,3}(\.\d{3})*,\d{2}$|^\d+([.,]\d{2})?$/;
        for (var r = 1; r <= ws.rowCount; r++) {
            var parts = [];
            var cells = [];
            var cols = Math.max(1, ws.columnCount || 1);
            for (var c = 1; c <= cols; c++) {
                var t = this.cellText(ws.getCell(r, c)).trim();
                cells.push(t);
                if (t)
                    parts.push(t);
            }
            var line = parts.join(' ');
            if (!line)
                continue;
            // CPF -> “abre” um novo paciente
            var cpfMatch = line.match(/(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/);
            if (cpfMatch) {
                currentCpf = this.onlyDigits(cpfMatch[1]);
                // Tenta "Paciente: NOME"
                var nome = void 0;
                var nomePac = line.match(/paciente\s*:\s*([A-Za-zÀ-ú\s']{3,})/i);
                if (nomePac)
                    nome = this.sanitizePacienteNome(nomePac[1].trim());
                else {
                    // Heurística: texto antes do CPF
                    var idx = line.indexOf(cpfMatch[1]);
                    if (idx > 0)
                        nome = line.slice(0, idx).replace(/[:\-]/g, ' ').trim();
                }
                currentNome = this.sanitizePacienteNome(nome);
                continue;
            }
            // Candidata a linha de exame
            var anyMoney = cells.find(function (t) { return moneyRegex.test(t); });
            var anyDate = cells.find(function (t) { return /\d{2}\/\d{2}\/\d{4}/.test(t); });
            var anyTipo = cells.find(function (t) { return TIPOS.includes(t.trim()); });
            if (anyMoney && anyDate) {
                var examName = cells
                    .filter(function (t) {
                    return t &&
                        !/\d{2}\/\d{2}\/\d{4}/.test(t) &&
                        !moneyRegex.test(t) &&
                        !TIPOS.includes(t);
                })
                    .sort(function (a, b) { return b.length - a.length; })[0];
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
    };
    ImportFechamentoExcelService.prototype.ensureEmpresa = function (rodape, args) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var e, e, e, nomeClean, e, novo;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!args.empresaId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.empresaRepo.findOne(args.empresaId)];
                    case 1:
                        e = _b.sent();
                        if (e)
                            return [2 /*return*/, e];
                        _b.label = 2;
                    case 2:
                        if (!args.empresaCnpj) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.empresaRepo.findOne({ where: { cnpj: this.onlyDigits(args.empresaCnpj) } })];
                    case 3:
                        e = _b.sent();
                        if (e)
                            return [2 /*return*/, e];
                        _b.label = 4;
                    case 4:
                        if (!(rodape === null || rodape === void 0 ? void 0 : rodape.cnpj)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.empresaRepo.findOne({ where: { cnpj: rodape.cnpj } })];
                    case 5:
                        e = _b.sent();
                        if (e)
                            return [2 /*return*/, e];
                        _b.label = 6;
                    case 6:
                        if (!(rodape === null || rodape === void 0 ? void 0 : rodape.nome)) return [3 /*break*/, 8];
                        nomeClean = rodape.nome.replace(/\s+/g, ' ').trim();
                        return [4 /*yield*/, this.empresaRepo.findOne({ where: { nome: (0, typeorm_1.ILike)(nomeClean) } })];
                    case 7:
                        e = _b.sent();
                        if (e)
                            return [2 /*return*/, e];
                        _b.label = 8;
                    case 8:
                        if (!(((rodape === null || rodape === void 0 ? void 0 : rodape.nome) || (rodape === null || rodape === void 0 ? void 0 : rodape.cnpj)) && ((_a = args.allowCreateEmpresaIfMissing) !== null && _a !== void 0 ? _a : true))) return [3 /*break*/, 10];
                        novo = this.empresaRepo.create({
                            nome: (rodape === null || rodape === void 0 ? void 0 : rodape.nome) || 'EMPRESA (import)',
                            cnpj: this.onlyDigits(rodape === null || rodape === void 0 ? void 0 : rodape.cnpj) || '00000000000000',
                            esocial: false,
                            convenio: true,
                        });
                        if (args.dryRun)
                            return [2 /*return*/, novo];
                        return [4 /*yield*/, this.empresaRepo.save(novo)];
                    case 9: return [2 /*return*/, _b.sent()];
                    case 10: return [2 /*return*/, undefined];
                }
            });
        });
    };
    ImportFechamentoExcelService.prototype.getOrCreatePaciente = function (manager, nome, cpf, empresaId, allowCreate) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, cpfDigits, found, now, novo, saved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!cpf)
                            return [2 /*return*/, { pac: undefined, created: false }];
                        repo = manager.getRepository(Paciente_1.default);
                        cpfDigits = this.onlyDigits(cpf);
                        return [4 /*yield*/, repo.findOne({ where: { cpf: cpfDigits } })];
                    case 1:
                        found = _a.sent();
                        if (!found) return [3 /*break*/, 4];
                        if (!(!found.empresa_id && empresaId)) return [3 /*break*/, 3];
                        found.empresa_id = empresaId;
                        return [4 /*yield*/, repo.save(found)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/, { pac: found, created: false }];
                    case 4:
                        if (!allowCreate)
                            return [2 /*return*/, { pac: undefined, created: false }];
                        now = new Date();
                        novo = repo.create({
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
    ImportFechamentoExcelService.prototype.findExameByNome = function (nome) {
        return __awaiter(this, void 0, void 0, function () {
            var cols, candidates, where;
            return __generator(this, function (_a) {
                if (!nome)
                    return [2 /*return*/, undefined];
                cols = this.exameRepo.metadata.columns.map(function (c) { return c.propertyName; });
                candidates = ['name', 'nome', 'descricao', 'titulo'];
                where = candidates.filter(function (c) { return cols.includes(c); })
                    .map(function (p) {
                    var _a;
                    return (_a = {}, _a[p] = (0, typeorm_1.ILike)(nome.trim()), _a);
                });
                if (!where.length)
                    return [2 /*return*/, undefined];
                return [2 /*return*/, this.exameRepo.findOne({ where: where })];
            });
        });
    };
    // ----------------- principal -----------------
    ImportFechamentoExcelService.prototype.execute = function (args) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function () {
            var avisos, erros, wb, ws, rodape, empresa, parsed, group, cpfsVistos, linhasIgnoradas, _i, parsed_1, row, cpfDigits, d, key, pacientesCriados, asosCriados, pacientesLidos, examesTiposCriados, examesAsoInseridos, allowCreatePac, exameAsoColsRaw, exameAsoCols, hasDataExame, hasDataValidade, hasDataCadastro, hasTipoPagamentoId, createdPacIds, asoColsRaw, asoCols, hasAsoTipoAsoId, tipoAsoRows, tipoAsoMap, _f, _g, r, result;
            var _this = this;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        avisos = [];
                        erros = [];
                        wb = new exceljs_1.default.Workbook();
                        return [4 /*yield*/, wb.xlsx.load(args.file)];
                    case 1:
                        _h.sent();
                        ws = wb.worksheets[0];
                        rodape = this.extractCompanyFromFooter(ws);
                        return [4 /*yield*/, this.ensureEmpresa(rodape, args)];
                    case 2:
                        empresa = _h.sent();
                        if (!empresa) {
                            avisos.push('Empresa não identificada nem criada. Vou continuar, mas não vincularei ASO à empresa.');
                        }
                        parsed = this.scanExamRows(ws);
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
                        pacientesCriados = 0;
                        asosCriados = 0;
                        pacientesLidos = cpfsVistos.size;
                        examesTiposCriados = 0;
                        examesAsoInseridos = 0;
                        allowCreatePac = args.allowCreatePacienteIfMissing !== false;
                        return [4 /*yield*/, (0, typeorm_1.getManager)().query("\n    SELECT column_name\n    FROM information_schema.columns\n    WHERE table_schema='public' AND table_name='exameaso'\n    ")];
                    case 3:
                        exameAsoColsRaw = _h.sent();
                        exameAsoCols = new Set(((_a = exameAsoColsRaw === null || exameAsoColsRaw === void 0 ? void 0 : exameAsoColsRaw.rows) !== null && _a !== void 0 ? _a : exameAsoColsRaw).map(function (r) { return r.column_name; }));
                        hasDataExame = exameAsoCols.has('dataexame');
                        hasDataValidade = exameAsoCols.has('datavalidadeexame');
                        hasDataCadastro = exameAsoCols.has('data_cadastro_exame');
                        hasTipoPagamentoId = exameAsoCols.has('tipopagamento_id');
                        createdPacIds = new Set();
                        return [4 /*yield*/, (0, typeorm_1.getManager)().query("\n        SELECT column_name\n        FROM information_schema.columns\n        WHERE table_schema='public' AND table_name='aso'\n        ")];
                    case 4:
                        asoColsRaw = _h.sent();
                        asoCols = new Set(((_b = asoColsRaw === null || asoColsRaw === void 0 ? void 0 : asoColsRaw.rows) !== null && _b !== void 0 ? _b : asoColsRaw).map(function (r) { return r.column_name; }));
                        hasAsoTipoAsoId = asoCols.has('tipoaso_id');
                        return [4 /*yield*/, (0, typeorm_1.getManager)().query("\n        SELECT id, descricao FROM public.tipoaso\n        ")];
                    case 5:
                        tipoAsoRows = _h.sent();
                        tipoAsoMap = new Map();
                        for (_f = 0, _g = ((_c = tipoAsoRows === null || tipoAsoRows === void 0 ? void 0 : tipoAsoRows.rows) !== null && _c !== void 0 ? _c : tipoAsoRows); _f < _g.length; _f++) {
                            r = _g[_f];
                            tipoAsoMap.set(this.norm(r.descricao), r.id);
                        }
                        return [4 /*yield*/, (0, typeorm_1.getManager)().transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var _i, _a, rows, sample, cpf, nome, dataBase, rawTipoAso, tipoKey, tipoAsoId, _b, pac, created, asoId, asoColumns, asoValues, asoPlaceholders, ret, returnedId, _c, rows_1, ex, dataExame, examEntity, columns, values, insertPos, idxBeforeAudit, insertIdx, placeholders;
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
                                            // alias simples: muitos arquivos trazem só "RETORNO"
                                            if (tipoKey === 'RETORNO')
                                                tipoKey = 'RETORNO AO TRABALHO';
                                            tipoAsoId = tipoAsoMap.get(tipoKey) || null;
                                            return [4 /*yield*/, this.getOrCreatePaciente(trx, // <-- passa o manager da transação
                                                nome, cpf, empresa === null || empresa === void 0 ? void 0 : empresa.id, allowCreatePac)];
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
                                            asoColumns = [
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
                                            asoValues = [
                                                'import',
                                                dataBase,
                                                true,
                                                true,
                                                false,
                                                true,
                                                pac.id,
                                                (empresa === null || empresa === void 0 ? void 0 : empresa.id) || null,
                                                CONVENIO_TIPOPAGAMENTO_ID,
                                            ];
                                            if (hasAsoTipoAsoId) {
                                                asoColumns.push('tipoaso_id');
                                                asoValues.push(tipoAsoId); // pode ser null se não encontrado, e tudo bem
                                            }
                                            // auditoria
                                            asoColumns.push('created_at', 'updated_at');
                                            asoValues.push(new Date(), new Date());
                                            asoPlaceholders = asoValues.map(function (_, i) { return "$".concat(i + 1); }).join(', ');
                                            return [4 /*yield*/, trx.query("INSERT INTO public.aso (".concat(asoColumns.join(', '), ") VALUES (").concat(asoPlaceholders, ") RETURNING id"), asoValues)];
                                        case 4:
                                            ret = _j.sent();
                                            returnedId = Array.isArray(ret) ? (_d = ret[0]) === null || _d === void 0 ? void 0 : _d.id :
                                                (_f = (_e = ret === null || ret === void 0 ? void 0 : ret.rows) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.id;
                                            if (!returnedId) {
                                                throw new Error("INSERT ASO n\u00E3o retornou id. Retorno: ".concat(JSON.stringify(ret)));
                                            }
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
                                            examesTiposCriados++; // conta tipos novos
                                            _j.label = 9;
                                        case 9:
                                            if (!!args.dryRun) return [3 /*break*/, 11];
                                            columns = [
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
                                            values = [
                                                asoId,
                                                examEntity.id,
                                                // datas...
                                                true,
                                                true,
                                                (_g = ex.valor) !== null && _g !== void 0 ? _g : 0,
                                                (_h = ex.valor) !== null && _h !== void 0 ? _h : 0,
                                                0,
                                                0,
                                                'import',
                                                new Date(),
                                                new Date(), // updated_at
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
                                            // tipopagamento_id (se existir no schema atual)
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
                        // >>> AQUI: total de pacientes efetivamente criados nesta importação
                        pacientesCriados = createdPacIds.size;
                        result = {
                            empresa: empresa ? { id: empresa.id, nome: empresa.nome, cnpj: empresa.cnpj } : null,
                            periodo: rodape ? {
                                inicio: (_d = rodape.periodoInicio) === null || _d === void 0 ? void 0 : _d.toISOString().slice(0, 10),
                                fim: (_e = rodape.periodoFim) === null || _e === void 0 ? void 0 : _e.toISOString().slice(0, 10),
                            } : null,
                            contagens: { pacientesLidos: pacientesLidos, pacientesCriados: pacientesCriados, asosCriados: asosCriados, examesCriados: examesAsoInseridos, linhasIgnoradas: linhasIgnoradas },
                            avisos: avisos,
                            erros: erros,
                        };
                        // opcional:
                        result.contagens.novosTiposExame = examesTiposCriados;
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return ImportFechamentoExcelService;
}());
exports.default = ImportFechamentoExcelService;
