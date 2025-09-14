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
var typeorm_1 = require("typeorm");
var Despesa_1 = __importDefault(require("@modules/despesas/typeorm/entities/Despesa"));
var Fechamento_1 = __importDefault(require("@modules/fechamento/typeorm/entities/Fechamento"));
var pdfkit_1 = __importDefault(require("pdfkit"));
var exceljs_1 = __importDefault(require("exceljs"));
var RelatoriosController = /** @class */ (function () {
    function RelatoriosController() {
    }
    RelatoriosController.prototype.despesas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dataInicio, dataFim, status, repo, qb, despesas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, dataInicio = _a.dataInicio, dataFim = _a.dataFim, status = _a.status;
                        repo = (0, typeorm_1.getRepository)(Despesa_1.default);
                        qb = repo.createQueryBuilder('d');
                        if (dataInicio && dataFim) {
                            qb.andWhere('d.data_vencimento BETWEEN :inicio AND :fim', {
                                inicio: dataInicio,
                                fim: dataFim,
                            });
                        }
                        if (status && status !== 'null') {
                            qb.andWhere('d.status = :status', { status: status });
                        }
                        return [4 /*yield*/, qb.getMany()];
                    case 1:
                        despesas = _b.sent();
                        return [2 /*return*/, res.json(despesas)];
                }
            });
        });
    };
    RelatoriosController.prototype.despesasExcel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dataInicio, dataFim, status_1, repo, qb, despesas, workbook, sheet_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.query, dataInicio = _a.dataInicio, dataFim = _a.dataFim, status_1 = _a.status;
                        repo = (0, typeorm_1.getRepository)(Despesa_1.default);
                        qb = repo.createQueryBuilder('d');
                        if (dataInicio && dataFim) {
                            qb.andWhere('d.data_vencimento BETWEEN :inicio AND :fim', {
                                inicio: dataInicio,
                                fim: dataFim,
                            });
                        }
                        if (status_1 && status_1 !== 'null') {
                            qb.andWhere('d.status = :status', { status: status_1 });
                        }
                        return [4 /*yield*/, qb.getMany()];
                    case 1:
                        despesas = _b.sent();
                        workbook = new exceljs_1.default.Workbook();
                        sheet_1 = workbook.addWorksheet('Despesas');
                        sheet_1.columns = [
                            { header: 'Descrição', key: 'descricao', width: 40 },
                            { header: 'Valor (R$)', key: 'valor_total', width: 15 },
                            { header: 'Status', key: 'status', width: 15 },
                            { header: 'Data Vencimento', key: 'data_vencimento', width: 20 },
                        ];
                        despesas.forEach(function (d) {
                            var valor = Number(d.valor_total || 0);
                            sheet_1.addRow({
                                descricao: d.descricao,
                                valor_total: valor,
                                status: d.status,
                                data_vencimento: d.data_vencimento
                                    ? new Date(d.data_vencimento).toLocaleDateString('pt-BR')
                                    : '-',
                            });
                        });
                        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_despesas.xlsx');
                        return [4 /*yield*/, workbook.xlsx.write(res)];
                    case 2:
                        _b.sent();
                        res.end();
                        return [2 /*return*/];
                    case 3:
                        error_1 = _b.sent();
                        console.error(error_1);
                        res.status(500).json({ message: 'Erro ao gerar Excel', error: error_1 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RelatoriosController.prototype.despesasPdf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dataInicio, dataFim, status, repo, qb, despesas, doc, y, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, dataInicio = _a.dataInicio, dataFim = _a.dataFim, status = _a.status;
                        repo = (0, typeorm_1.getRepository)(Despesa_1.default);
                        qb = repo.createQueryBuilder('d');
                        if (dataInicio && dataFim) {
                            qb.andWhere('d.data_vencimento BETWEEN :inicio AND :fim', {
                                inicio: dataInicio,
                                fim: dataFim,
                            });
                        }
                        if (status && status !== 'null') {
                            qb.andWhere('d.status = :status', { status: status });
                        }
                        return [4 /*yield*/, qb.getMany()];
                    case 1:
                        despesas = _b.sent();
                        doc = new pdfkit_1.default({ margin: 40 });
                        res.setHeader('Content-Type', 'application/pdf');
                        res.setHeader('Content-Disposition', 'inline; filename=relatorio_despesas.pdf');
                        doc.pipe(res);
                        // 🔹 Título
                        doc.fontSize(16).text('Relatório de Despesas', { align: 'center' });
                        doc.moveDown(2);
                        y = doc.y;
                        doc.fontSize(12).fillColor('black').font('Helvetica-Bold');
                        doc.text('Descrição', 40, y, { width: 200 });
                        doc.text('Status', 250, y, { width: 80 });
                        doc.text('Valor (R$)', 340, y, { width: 100, align: 'right' });
                        doc.text('Vencimento', 460, y, { width: 100 });
                        doc.moveDown(0.5);
                        // 🔹 Linha separadora
                        y = doc.y;
                        doc.moveTo(40, y).lineTo(560, y).stroke();
                        doc.moveDown(0.5);
                        total = 0;
                        despesas.forEach(function (d) {
                            var venc = d.data_vencimento
                                ? new Date(d.data_vencimento).toLocaleDateString('pt-BR')
                                : '-';
                            var valor = Number(d.valor_total || 0);
                            total += valor;
                            y = doc.y;
                            // Descrição
                            doc.font('Helvetica').fontSize(10).fillColor('black');
                            doc.text(d.descricao || '', 40, y, { width: 200 });
                            // Status colorido
                            if (d.status === 'PAGA')
                                doc.fillColor('green');
                            else if (d.status === 'ABERTA')
                                doc.fillColor('red');
                            else
                                doc.fillColor('gray');
                            doc.text(d.status || '', 250, y, { width: 80 });
                            // Valor
                            doc.fillColor('black');
                            doc.text("R$ ".concat(valor.toFixed(2)), 340, y, { width: 100, align: 'right' });
                            // Vencimento
                            doc.text(venc, 460, y, { width: 100 });
                        });
                        // 🔹 Linha separadora final
                        doc.moveDown(0.5);
                        y = doc.y;
                        doc.moveTo(40, y).lineTo(560, y).stroke();
                        // 🔹 Total final
                        doc.fontSize(12).fillColor('black').font('Helvetica-Bold');
                        doc.text('TOTAL', 40, doc.y + 5, { width: 300 });
                        doc.text("R$ ".concat(total.toFixed(2)), 340, doc.y + 5, { width: 220, align: 'right' });
                        doc.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    RelatoriosController.prototype.cobrancas = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dataInicio, dataFim, status, repo, qb, cobrancas;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, dataInicio = _a.dataInicio, dataFim = _a.dataFim, status = _a.status;
                        repo = (0, typeorm_1.getRepository)(Fechamento_1.default) // 👈 entidade de cobrança/fechamento
                        ;
                        qb = repo.createQueryBuilder('f')
                            .leftJoinAndSelect('f.empresa', 'e');
                        if (dataInicio && dataFim) {
                            qb.andWhere('f.data_fechamento BETWEEN :inicio AND :fim', { inicio: dataInicio, fim: dataFim });
                        }
                        if (status && status !== 'null') {
                            qb.andWhere('f.status = :status', { status: status });
                        }
                        return [4 /*yield*/, qb.getMany()];
                    case 1:
                        cobrancas = _b.sent();
                        return [2 /*return*/, res.json(cobrancas)];
                }
            });
        });
    };
    RelatoriosController.prototype.cobrancasPdf = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, qb, fechamentos, doc, y, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = (0, typeorm_1.getRepository)(Fechamento_1.default);
                        qb = repo.createQueryBuilder('f')
                            .leftJoinAndSelect('f.empresa', 'e');
                        return [4 /*yield*/, qb.getMany()
                            // 🔹 Documento em PAISAGEM
                        ];
                    case 1:
                        fechamentos = _a.sent();
                        doc = new pdfkit_1.default({ margin: 40, size: 'A4', layout: 'landscape' });
                        res.setHeader('Content-Type', 'application/pdf');
                        res.setHeader('Content-Disposition', 'inline; filename=relatorio_cobrancas.pdf');
                        doc.pipe(res);
                        // 🔹 Título
                        doc.fontSize(18).text('Relatório de Cobranças', { align: 'center' });
                        doc.moveDown(2);
                        y = doc.y;
                        doc.fontSize(12).fillColor('black').font('Helvetica-Bold');
                        doc.text('Empresa', 40, y, { width: 220 });
                        doc.text('CNPJ', 270, y, { width: 120 });
                        doc.text('Valor (R$)', 400, y, { width: 80, align: 'right' });
                        doc.text('Pago (R$)', 490, y, { width: 80, align: 'right' });
                        doc.text('Status', 590, y, { width: 80 });
                        doc.text('Competência', 680, y, { width: 100 });
                        // 🔹 Linha separadora
                        y = doc.y + 5;
                        doc.moveTo(40, y).lineTo(760, y).stroke();
                        doc.moveDown(0.5);
                        total = 0;
                        fechamentos.forEach(function (f) {
                            var _a, _b;
                            var competencia = f.data_inicial
                                ? "".concat(String(new Date(f.data_inicial).getMonth() + 1).padStart(2, '0'), "/").concat(new Date(f.data_inicial).getFullYear())
                                : '';
                            var valor = Number(f.valor_total || 0);
                            var pago = Number(f.valor_pago || 0);
                            total += valor;
                            var empresaNome = ((_a = f.empresa) === null || _a === void 0 ? void 0 : _a.nome)
                                ? f.empresa.nome.length > 40
                                    ? f.empresa.nome.substring(0, 37) + '...'
                                    : f.empresa.nome
                                : '';
                            y = doc.y;
                            doc.font('Helvetica').fontSize(10).fillColor('black');
                            doc.text(empresaNome, 40, y, { width: 220 });
                            doc.text(((_b = f.empresa) === null || _b === void 0 ? void 0 : _b.cnpj) || '', 270, y, { width: 120 });
                            doc.text("R$ ".concat(valor.toFixed(2)), 400, y, { width: 80, align: 'right' });
                            doc.text("R$ ".concat(pago.toFixed(2)), 490, y, { width: 80, align: 'right' });
                            if ((f.status || '').toUpperCase() === 'PAGO')
                                doc.fillColor('green');
                            else if ((f.status || '').toUpperCase() === 'ABERTO')
                                doc.fillColor('red');
                            else
                                doc.fillColor('gray');
                            doc.text(f.status || '', 590, y, { width: 80 });
                            doc.fillColor('black');
                            doc.text(competencia, 680, y, { width: 100 });
                        });
                        // 🔹 Linha final
                        doc.moveDown(0.5);
                        y = doc.y;
                        doc.moveTo(40, y).lineTo(760, y).stroke();
                        // 🔹 Total
                        doc.fontSize(12).fillColor('black').font('Helvetica-Bold');
                        doc.text('TOTAL', 40, doc.y + 5, { width: 340 });
                        doc.text("R$ ".concat(total.toFixed(2)), 400, doc.y + 5, { width: 380, align: 'right' });
                        doc.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    RelatoriosController.prototype.cobrancasExcel = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var repo, qb, fechamentos, workbook, sheet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        repo = (0, typeorm_1.getRepository)(Fechamento_1.default);
                        qb = repo.createQueryBuilder('f')
                            .leftJoinAndSelect('f.empresa', 'e');
                        return [4 /*yield*/, qb.getMany()];
                    case 1:
                        fechamentos = _a.sent();
                        workbook = new exceljs_1.default.Workbook();
                        sheet = workbook.addWorksheet('Cobranças');
                        sheet.columns = [
                            { header: 'Empresa', key: 'empresa', width: 40 },
                            { header: 'CNPJ', key: 'cnpj', width: 20 },
                            { header: 'Valor (R$)', key: 'valor_total', width: 15 },
                            { header: 'Valor Pago (R$)', key: 'valor_pago', width: 15 },
                            { header: 'Status', key: 'status', width: 15 },
                            { header: 'Competência', key: 'competencia', width: 15 }
                        ];
                        fechamentos.forEach(function (f) {
                            var _a, _b;
                            var competencia = '';
                            if (f.data_inicial) {
                                var dataIni = new Date(f.data_inicial);
                                competencia = "".concat(String(dataIni.getMonth() + 1).padStart(2, '0'), "/").concat(dataIni.getFullYear());
                            }
                            sheet.addRow({
                                empresa: (_a = f.empresa) === null || _a === void 0 ? void 0 : _a.nome,
                                cnpj: (_b = f.empresa) === null || _b === void 0 ? void 0 : _b.cnpj,
                                valor_total: f.valor_total,
                                valor_pago: f.valor_pago,
                                status: f.status,
                                competencia: competencia
                            });
                        });
                        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                        res.setHeader('Content-Disposition', 'attachment; filename=relatorio_cobrancas.xlsx');
                        return [4 /*yield*/, workbook.xlsx.write(res)];
                    case 2:
                        _a.sent();
                        res.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    return RelatoriosController;
}());
exports.default = RelatoriosController;
