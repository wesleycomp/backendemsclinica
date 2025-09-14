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
var CreateExameAsoService_1 = __importDefault(require("../services/CreateExameAsoService"));
var UpdateExameAsoService_1 = __importDefault(require("../services/UpdateExameAsoService"));
var ListExamesAsoService_1 = __importDefault(require("../services/ListExamesAsoService"));
var ShowExamesAsosService_1 = __importDefault(require("../services/ShowExamesAsosService"));
var CreateHistoricoExclusaoExameAsoService_1 = __importDefault(require("../services/CreateHistoricoExclusaoExameAsoService"));
var ShowAsosService_1 = __importDefault(require("../services/ShowAsosService"));
var DeleteExameAsoService_1 = __importDefault(require("../services/DeleteExameAsoService"));
var utils_1 = __importDefault(require("@config/utils"));
//teste git
var ExameAsoController = /** @class */ (function () {
    function ExameAsoController() {
    }
    ExameAsoController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var listExamesAso, examesAso;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listExamesAso = new ListExamesAsoService_1.default();
                        return [4 /*yield*/, listExamesAso.execute()];
                    case 1:
                        examesAso = _a.sent();
                        return [2 /*return*/, response.json(examesAso)];
                }
            });
        });
    };
    ExameAsoController.prototype.showExamesPeriodo = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var datainicio, datafim, tipopagamento, usuario, empresa, empresafora, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datainicio = request.params.datainicio;
                        datafim = request.params.datafim;
                        tipopagamento = request.params.tipopagamento;
                        usuario = request.params.usuario;
                        empresa = request.params.empresa;
                        empresafora = request.params.empresafora;
                        showExameAso = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showExameAso.executeExamesPeriodo({ datainicio: datainicio, datafim: datafim, tipopagamento: tipopagamento, usuario: usuario, empresa: empresa, empresafora: empresafora })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.showExamesPeriodConsolidado = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var datainicio, datafim, idexame, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datainicio = request.params.datainicio;
                        datafim = request.params.datafim;
                        idexame = request.params.idexame;
                        showExameAso = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showExameAso.executeExamesPeriodoConsolidado({ datainicio: datainicio, datafim: datafim, idexame: idexame })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.showRelatorioFechamentoEmpresa = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var datainicio, datafim, tipopagamento, empresa, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datainicio = request.params.datainicio;
                        datafim = request.params.datafim;
                        tipopagamento = request.params.tipopagamento;
                        empresa = request.params.empresa;
                        showExameAso = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showExameAso.executeRelatorioFechamentoEmpresa({ datainicio: datainicio, datafim: datafim, empresa: empresa, tipopagamento: tipopagamento })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.showExames = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        showExameAso = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showExameAso.executeExames()];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var aso_id, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aso_id = request.params.aso_id;
                        showExameAso = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showExameAso.execute({ aso_id: aso_id })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.showAsoValores = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var aso_id, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aso_id = request.params.aso_id;
                        showExameAso = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showExameAso.executeValoresAso({ aso_id: aso_id })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, aso_id, exame_id, valorexame, valormedico, valorems, ativo, tipopagamento_id, user_id, createExame, exame;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, aso_id = _a.aso_id, exame_id = _a.exame_id, valorexame = _a.valorexame, valormedico = _a.valormedico, valorems = _a.valorems, ativo = _a.ativo, tipopagamento_id = _a.tipopagamento_id, user_id = _a.user_id;
                        createExame = new CreateExameAsoService_1.default();
                        return [4 /*yield*/, createExame.execute({
                                aso_id: aso_id,
                                exame_id: exame_id,
                                valorexame: valorexame,
                                valormedico: valormedico,
                                valorems: valorems,
                                ativo: ativo,
                                tipopagamento_id: tipopagamento_id,
                                user_id: user_id
                            })];
                    case 1:
                        exame = _b.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, desconto, valorexamesemdesconto, user_desconto, id, updateExame, exame;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, desconto = _a.desconto, valorexamesemdesconto = _a.valorexamesemdesconto, user_desconto = _a.user_desconto;
                        id = request.params.id;
                        updateExame = new UpdateExameAsoService_1.default();
                        return [4 /*yield*/, updateExame.execute({
                                id: id,
                                desconto: desconto,
                                valorexamesemdesconto: valorexamesemdesconto,
                                user_desconto: user_desconto
                            })];
                    case 1:
                        exame = _b.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    ExameAsoController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, usuario_id, util, created_at, exameAsoRepository, exameaso, aso_id, exame_id, tipopagamento_id, asoRepository, aso, paciente_id, empresa_id, funcao_id, historioExclusaoExameAso, historicoExclusaoExame, deleteExameAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, id = _a.id, usuario_id = _a.usuario_id;
                        util = new utils_1.default();
                        created_at = util.formatDate(new Date());
                        exameAsoRepository = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, exameAsoRepository.findExameAso({ id: id })];
                    case 1:
                        exameaso = _b.sent();
                        aso_id = exameaso.aso_id;
                        exame_id = exameaso.exame_id;
                        tipopagamento_id = exameaso.tipopagamento_id;
                        asoRepository = new ShowAsosService_1.default;
                        return [4 /*yield*/, asoRepository.findAso({ aso_id: aso_id })];
                    case 2:
                        aso = _b.sent();
                        paciente_id = aso.paciente_id;
                        empresa_id = aso.empresa_id;
                        funcao_id = aso.funcao_id;
                        historioExclusaoExameAso = new CreateHistoricoExclusaoExameAsoService_1.default();
                        return [4 /*yield*/, historioExclusaoExameAso.execute({
                                aso_id: aso_id,
                                exame_id: exame_id,
                                tipopagamento_id: tipopagamento_id,
                                paciente_id: paciente_id,
                                empresa_id: empresa_id,
                                funcao_id: funcao_id,
                                usuario_id: usuario_id,
                                created_at: created_at
                            })];
                    case 3:
                        historicoExclusaoExame = _b.sent();
                        deleteExameAso = new DeleteExameAsoService_1.default();
                        return [4 /*yield*/, deleteExameAso.execute({ id: id })];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.json(historicoExclusaoExame)];
                }
            });
        });
    };
    ExameAsoController.prototype.showExameAsoExcluidas = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var showExameAsoExcluida, examesAsosExcluidas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        showExameAsoExcluida = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showExameAsoExcluida.listExamesAsoExluidas()];
                    case 1:
                        examesAsosExcluidas = _a.sent();
                        return [2 /*return*/, response.json(examesAsosExcluidas)];
                }
            });
        });
    };
    ExameAsoController.prototype.showFechamentoMedicoExames = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var medico_id, datainicio, datafim, exame_id, showFechamentoMedico, fechamentoMedico;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        medico_id = request.params.medico_id;
                        datainicio = request.params.datainicio;
                        datafim = request.params.datafim;
                        exame_id = request.params.exame_id;
                        showFechamentoMedico = new ShowExamesAsosService_1.default();
                        return [4 /*yield*/, showFechamentoMedico.executeFechamentoMedicoExames({ datainicio: datainicio, datafim: datafim, medico_id: medico_id, exame_id: exame_id })];
                    case 1:
                        fechamentoMedico = _a.sent();
                        return [2 /*return*/, response.json(fechamentoMedico)];
                }
            });
        });
    };
    return ExameAsoController;
}());
exports.default = ExameAsoController;
