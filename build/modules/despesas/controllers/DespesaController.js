"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var CreateDespesaService_1 = __importDefault(require("../services/CreateDespesaService"));
var ListDespesaService_1 = __importDefault(require("../services/ListDespesaService"));
var ShowDespesaService_1 = __importDefault(require("../services/ShowDespesaService"));
var UpdateDespesaService_1 = __importDefault(require("../services/UpdateDespesaService"));
var DeleteDespesaService_1 = __importDefault(require("../services/DeleteDespesaService"));
var BaixarDespesaService_1 = __importDefault(require("../services/BaixarDespesaService")); // 👈 ajuste no path
var DespesaController = /** @class */ (function () {
    function DespesaController() {
    }
    DespesaController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, per_page, descricao, status, data_inicial, data_final, service, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.query, page = _a.page, per_page = _a.per_page, descricao = _a.descricao, status = _a.status, data_inicial = _a.data_inicial, data_final = _a.data_final;
                        service = new ListDespesaService_1.default();
                        return [4 /*yield*/, service.execute({
                                page: page ? Number(page) : 1,
                                per_page: per_page ? Number(per_page) : 10,
                                descricao: descricao ? String(descricao) : undefined,
                                status: status ? String(status) : undefined,
                                data_inicial: data_inicial ? String(data_inicial) : undefined,
                                data_final: data_final ? String(data_final) : undefined
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, res.json(result)];
                }
            });
        });
    };
    DespesaController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).json;
                        return [4 /*yield*/, new ShowDespesaService_1.default().execute({ id: req.params.id })];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    DespesaController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).json;
                        return [4 /*yield*/, new CreateDespesaService_1.default().execute(req.body)];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    DespesaController.prototype.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = res).json;
                        return [4 /*yield*/, new UpdateDespesaService_1.default().execute(__assign({ id: req.params.id }, req.body))];
                    case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
                }
            });
        });
    };
    DespesaController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new DeleteDespesaService_1.default().execute({ id: req.params.id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, res.json([])];
                }
            });
        });
    };
    // src/modules/despesas/controllers/DespesaController.ts
    DespesaController.prototype.baixar = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, data_pagamento, conta_bancaria_id, observacao, juros, desconto, service, despesa;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = req.params.id;
                        _a = req.body, data_pagamento = _a.data_pagamento, conta_bancaria_id = _a.conta_bancaria_id, observacao = _a.observacao, juros = _a.juros, desconto = _a.desconto;
                        service = new BaixarDespesaService_1.default();
                        return [4 /*yield*/, service.execute({
                                id: id,
                                data_pagamento: data_pagamento,
                                conta_bancaria_id: conta_bancaria_id,
                                observacao: observacao,
                                juros: juros,
                                desconto: desconto,
                            })];
                    case 1:
                        despesa = _b.sent();
                        return [2 /*return*/, res.json(despesa)];
                }
            });
        });
    };
    return DespesaController;
}());
exports.default = DespesaController;
