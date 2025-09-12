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
var ExamesAsoRepository_1 = require("../typeorm/repositories/ExamesAsoRepository");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var HistoricoAsosExcluidasRepository_1 = __importDefault(require("../typeorm/repositories/HistoricoAsosExcluidasRepository"));
var HistoricoExclusaoExameAsoRepository_1 = __importDefault(require("../typeorm/repositories/HistoricoExclusaoExameAsoRepository"));
var HistoricoAsosEditadasRepository_1 = __importDefault(require("../typeorm/repositories/HistoricoAsosEditadasRepository"));
var ShowExamesAsosService = /** @class */ (function () {
    function ShowExamesAsosService() {
    }
    ShowExamesAsosService.prototype.execute = function (_a) {
        var aso_id = _a.aso_id;
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        return [4 /*yield*/, examesAsosRepository.findByAso(aso_id)];
                    case 1:
                        examesAso = _b.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeAsosExlcuidasPeriodo = function (datainicio, datafim) {
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(HistoricoAsosExcluidasRepository_1.default);
                        return [4 /*yield*/, examesAsosRepository.findAsosExcluidasPeriodo(datainicio, datafim)];
                    case 1:
                        examesAso = _a.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso excluidas não encontradas');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeAsosEditadasPeriodo = function (datainicio, datafim) {
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(HistoricoAsosEditadasRepository_1.default);
                        return [4 /*yield*/, examesAsosRepository.findAsosEditadasPeriodo(datainicio, datafim)];
                    case 1:
                        examesAso = _a.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso excluidas não encontradas');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeExamesPeriodo = function (_a) {
        var datainicio = _a.datainicio, datafim = _a.datafim, tipopagamento = _a.tipopagamento, usuario = _a.usuario, empresa = _a.empresa, empresafora = _a.empresafora;
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso, examesAso, examesAso, examesAso, examesAso, examesAso, examesAso, examesAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        if (!(empresafora == '0')) return [3 /*break*/, 13];
                        if (!((usuario == '0') && (tipopagamento == '0') && (empresa == '0') && (empresafora == '0'))) return [3 /*break*/, 2];
                        console.log('selecionou somente o periodo ');
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodo(datainicio, datafim)];
                    case 1:
                        examesAso = _b.sent();
                        return [3 /*break*/, 12];
                    case 2:
                        if (!((usuario != '0') && (tipopagamento == '0') && (empresa == '0') && (empresafora == '0'))) return [3 /*break*/, 4];
                        console.log('selecionou usuario ');
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoUsuario(datainicio, datafim, usuario)];
                    case 3:
                        examesAso = _b.sent();
                        return [3 /*break*/, 12];
                    case 4:
                        if (!((usuario == '0') && (tipopagamento != '0') && (empresa == '0') && (empresafora == '0'))) return [3 /*break*/, 6];
                        console.log('selecionou tipo pagamento ');
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoTipoPagamento(datainicio, datafim, tipopagamento)];
                    case 5:
                        examesAso = _b.sent();
                        return [3 /*break*/, 12];
                    case 6:
                        if (!((tipopagamento != '0') && (usuario != '0') && (empresa == '0') && (empresafora == '0'))) return [3 /*break*/, 8];
                        console.log('selecionou tipo pagamento e usuario');
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoTipoPagamentoUsuario(datainicio, datafim, tipopagamento, usuario)];
                    case 7:
                        examesAso = _b.sent();
                        return [3 /*break*/, 12];
                    case 8:
                        if (!((empresa != '0') && (tipopagamento == '0') && (usuario == '0') && (empresafora == '0'))) return [3 /*break*/, 10];
                        console.log('selecionou empresa');
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoEmpresa(datainicio, datafim, empresa)];
                    case 9:
                        examesAso = _b.sent();
                        return [3 /*break*/, 12];
                    case 10:
                        if (!((empresa != '0') && (tipopagamento != '0') && (usuario == '0') && (empresafora == '0'))) return [3 /*break*/, 12];
                        console.log(' selecionou empresa e tipo pagamento ');
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoEmpresaTipoPagamento(datainicio, datafim, empresa, tipopagamento)];
                    case 11:
                        examesAso = _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 17];
                    case 13:
                        if (!(empresafora == 'sim')) return [3 /*break*/, 15];
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoEmpresaFora(datainicio, datafim, empresa, tipopagamento)];
                    case 14:
                        examesAso = _b.sent();
                        return [3 /*break*/, 17];
                    case 15:
                        if (!(empresafora == 'nao')) return [3 /*break*/, 17];
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoEmpresaForaNao(datainicio, datafim, empresa, tipopagamento)];
                    case 16:
                        examesAso = _b.sent();
                        _b.label = 17;
                    case 17:
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeRelatorioFechamentoEmpresa = function (_a) {
        var datainicio = _a.datainicio, datafim = _a.datafim, empresa = _a.empresa, tipopagamento = _a.tipopagamento;
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso, examesAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        if (!(tipopagamento == '0')) return [3 /*break*/, 2];
                        return [4 /*yield*/, examesAsosRepository.findRelatorioFechamentoPeriodoEmpresa(datainicio, datafim, empresa)];
                    case 1:
                        examesAso = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, examesAsosRepository.findRelatorioFechamentoPeriodoEmpresaTipoPagamento(datainicio, datafim, empresa, tipopagamento)];
                    case 3:
                        examesAso = _b.sent();
                        _b.label = 4;
                    case 4:
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeExames = function () {
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizados()];
                    case 1:
                        examesAso = _a.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeValoresAso = function (_a) {
        var aso_id = _a.aso_id;
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        return [4 /*yield*/, examesAsosRepository.findExamesByAso(aso_id)];
                    case 1:
                        examesAso = _b.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.findExameAso = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var exameAsoRepository, exameAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        exameAsoRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        return [4 /*yield*/, exameAsoRepository.findOne(id)];
                    case 1:
                        exameAso = _b.sent();
                        if (!exameAso) {
                            throw new AppError_1.default('Exame Aso não encontrado');
                        }
                        return [2 /*return*/, exameAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.listExamesAsoExluidas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(HistoricoExclusaoExameAsoRepository_1.default);
                        return [4 /*yield*/, examesAsosRepository.findExameAsoExcluidas()];
                    case 1:
                        examesAso = _a.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.listAsoEditadas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(HistoricoExclusaoExameAsoRepository_1.default);
                        return [4 /*yield*/, examesAsosRepository.findExameAsoExcluidas()];
                    case 1:
                        examesAso = _a.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeFechamentoMedicoExames = function (_a) {
        var datainicio = _a.datainicio, datafim = _a.datafim, medico_id = _a.medico_id, exame_id = _a.exame_id;
        return __awaiter(this, void 0, void 0, function () {
            var exameAsoRepository, exameAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        exameAsoRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        return [4 /*yield*/, exameAsoRepository.findByMedicoFechamentoExames(datainicio, datafim, medico_id, exame_id)];
                    case 1:
                        exameAso = _b.sent();
                        return [2 /*return*/, exameAso];
                }
            });
        });
    };
    ShowExamesAsosService.prototype.executeExamesPeriodoConsolidado = function (_a) {
        var datainicio = _a.datainicio, datafim = _a.datafim, idexame = _a.idexame;
        return __awaiter(this, void 0, void 0, function () {
            var examesAsosRepository, examesAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        examesAsosRepository = (0, typeorm_1.getCustomRepository)(ExamesAsoRepository_1.ExamesAsoRepository);
                        return [4 /*yield*/, examesAsosRepository.findExamesRealizadosPeriodoConsolidado(datainicio, datafim, idexame)];
                    case 1:
                        examesAso = _b.sent();
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    return ShowExamesAsosService;
}());
exports.default = ShowExamesAsosService;
