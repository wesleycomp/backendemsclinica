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
// src/modules/despesas/services/BaixarDespesaService.ts
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var DespesaRepository_1 = __importDefault(require("../typeorm/repositories/DespesaRepository"));
var typeorm_1 = require("typeorm");
var BaixarDespesaService = /** @class */ (function () {
    function BaixarDespesaService() {
    }
    BaixarDespesaService.prototype.execute = function (_a) {
        var id = _a.id, data_pagamento = _a.data_pagamento, conta_bancaria_id = _a.conta_bancaria_id, observacao = _a.observacao, _b = _a.juros, juros = _b === void 0 ? 0 : _b, _c = _a.desconto, desconto = _c === void 0 ? 0 : _c;
        return __awaiter(this, void 0, void 0, function () {
            var repo, despesa, jurosNumber, descontoNumber, inicial, total;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        repo = (0, typeorm_1.getCustomRepository)(DespesaRepository_1.default);
                        return [4 /*yield*/, repo.findById(id)];
                    case 1:
                        despesa = _d.sent();
                        if (!despesa)
                            throw new AppError_1.default('Despesa não encontrada', 404);
                        jurosNumber = Number(juros) || 0;
                        descontoNumber = Number(desconto) || 0;
                        inicial = Number(despesa.valor_inicial) || 0;
                        total = Number((inicial + jurosNumber - descontoNumber).toFixed(2));
                        despesa.data_pagamento = data_pagamento ? new Date(data_pagamento) : null;
                        despesa.conta_bancaria_id = conta_bancaria_id || null;
                        despesa.observacao = observacao || null;
                        // persistir campos financeiros
                        despesa.juros = jurosNumber; // coluna já existe
                        despesa.desconto = descontoNumber; // coluna já existe
                        despesa.valor_total = total; // total calculado
                        despesa.valor_pago = total; // opcional: registrar pago = total
                        despesa.status = 'PAGA';
                        return [4 /*yield*/, repo.save(despesa)];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, despesa];
                }
            });
        });
    };
    return BaixarDespesaService;
}());
exports.default = BaixarDespesaService;
