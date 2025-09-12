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
var AsosRepository_1 = require("../typeorm/repositories/AsosRepository");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var HistoricoAsosExcluidasRepository_1 = __importDefault(require("../typeorm/repositories/HistoricoAsosExcluidasRepository"));
var ShowAsosService = /** @class */ (function () {
    function ShowAsosService() {
    }
    ShowAsosService.prototype.execute = function (_a) {
        var id = _a.id;
        return __awaiter(this, void 0, void 0, function () {
            var asosRepository, aso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asosRepository = (0, typeorm_1.getCustomRepository)(AsosRepository_1.AsosRepository);
                        return [4 /*yield*/, asosRepository.findById(id)];
                    case 1:
                        aso = _b.sent();
                        if (!aso) {
                            throw new AppError_1.default('Exame de Aso não encontrado');
                            //return aso
                        }
                        return [2 /*return*/, aso];
                }
            });
        });
    };
    ShowAsosService.prototype.findAso = function (_a) {
        var aso_id = _a.aso_id;
        return __awaiter(this, void 0, void 0, function () {
            var asosRepository, aso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asosRepository = (0, typeorm_1.getCustomRepository)(AsosRepository_1.AsosRepository);
                        return [4 /*yield*/, asosRepository.findById(aso_id)];
                    case 1:
                        aso = _b.sent();
                        if (!aso) {
                            throw new AppError_1.default('Exame de Aso não encontrado');
                        }
                        return [2 /*return*/, aso];
                }
            });
        });
    };
    ShowAsosService.prototype.listAsosCriadas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var asosCriadasRepository, asosCriadas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        asosCriadasRepository = (0, typeorm_1.getCustomRepository)(AsosRepository_1.AsosRepository);
                        return [4 /*yield*/, asosCriadasRepository.findHistoricoAsosCriadas()];
                    case 1:
                        asosCriadas = _a.sent();
                        if (!asosCriadas) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, asosCriadas];
                }
            });
        });
    };
    ShowAsosService.prototype.listAsosExcluidas = function () {
        return __awaiter(this, void 0, void 0, function () {
            var asosExcluidasRepository, asosExcluidas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        asosExcluidasRepository = (0, typeorm_1.getCustomRepository)(HistoricoAsosExcluidasRepository_1.default);
                        return [4 /*yield*/, asosExcluidasRepository.findHistoricoAsosExcluidas()];
                    case 1:
                        asosExcluidas = _a.sent();
                        if (!asosExcluidas) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, asosExcluidas];
                }
            });
        });
    };
    ShowAsosService.prototype.executeRelatorioFechamento = function (_a) {
        var datainicio = _a.datainicio, datafim = _a.datafim, empresa = _a.empresa, tipopagamento = _a.tipopagamento, empresafora = _a.empresafora;
        return __awaiter(this, void 0, void 0, function () {
            var asosRepository, examesAso, examesAso, examesAso, examesAso, examesAso;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asosRepository = (0, typeorm_1.getCustomRepository)(AsosRepository_1.AsosRepository);
                        if (!(empresafora == '0')) return [3 /*break*/, 9];
                        if (!((tipopagamento == '0') && (empresa == '0'))) return [3 /*break*/, 2];
                        console.log('selecionou somente o periodo fechamento ');
                        return [4 /*yield*/, asosRepository.findRelatorioFechamentoPeriodo(datainicio, datafim)];
                    case 1:
                        examesAso = _b.sent();
                        return [3 /*break*/, 8];
                    case 2:
                        if (!((tipopagamento != '0') && (empresa == '0'))) return [3 /*break*/, 4];
                        console.log('selecionou tipo pagamento ');
                        return [4 /*yield*/, asosRepository.findRelatorioFechamentoPeriodoTipoPagamento(datainicio, datafim, tipopagamento)];
                    case 3:
                        examesAso = _b.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        if (!((tipopagamento == '0') && (empresa != '0'))) return [3 /*break*/, 6];
                        console.log('selecionou a empresa ');
                        return [4 /*yield*/, asosRepository.findRelatorioFechamentoPeriodoEmpresa(datainicio, datafim, empresa)];
                    case 5:
                        examesAso = _b.sent();
                        return [3 /*break*/, 8];
                    case 6:
                        if (!((tipopagamento != '0') && (empresa != '0'))) return [3 /*break*/, 8];
                        console.log('selecionou tipo pagamento e a empresa ');
                        return [4 /*yield*/, asosRepository.findRelatorioFechamentoPeriodoEmpresaTipopagamento(datainicio, datafim, empresa, tipopagamento)];
                    case 7:
                        examesAso = _b.sent();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9: return [4 /*yield*/, asosRepository.findRelatorioFechamentoPeriodoEmpresaFora(datainicio, datafim, empresafora)];
                    case 10:
                        examesAso = _b.sent();
                        _b.label = 11;
                    case 11:
                        if (!examesAso) {
                            throw new AppError_1.default('Aso não encontrado');
                        }
                        return [2 /*return*/, examesAso];
                }
            });
        });
    };
    return ShowAsosService;
}());
exports.default = ShowAsosService;
