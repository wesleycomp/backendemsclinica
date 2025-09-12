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
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var DespesaRepository_1 = require("../typeorm/repositories/DespesaRepository");
var CreateDespesaService = /** @class */ (function () {
    function CreateDespesaService() {
    }
    CreateDespesaService.prototype.execute = function (data) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return __awaiter(this, void 0, void 0, function () {
            var repo, despesa;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0:
                        repo = (0, typeorm_1.getCustomRepository)(DespesaRepository_1.DespesaRepository);
                        despesa = repo.create({
                            fornecedor_id: data.fornecedor_id,
                            centro_custo_id: (_a = data.centro_custo_id) !== null && _a !== void 0 ? _a : null,
                            categoria_id: (_b = data.categoria_id) !== null && _b !== void 0 ? _b : null,
                            descricao: data.descricao,
                            documento: (_c = data.documento) !== null && _c !== void 0 ? _c : null,
                            data_emissao: (_d = data.data_emissao) !== null && _d !== void 0 ? _d : null,
                            data_vencimento: (_e = data.data_vencimento) !== null && _e !== void 0 ? _e : null,
                            valor_inicial: (_f = data.valor_inicial) !== null && _f !== void 0 ? _f : 0,
                            forma_pagamento_id: (_g = data.forma_pagamento_id) !== null && _g !== void 0 ? _g : null,
                            numero_parcelas: (_h = data.numero_parcelas) !== null && _h !== void 0 ? _h : 1,
                            status: (_j = data.status) !== null && _j !== void 0 ? _j : 'ABERTA',
                        });
                        return [4 /*yield*/, repo.save(despesa)];
                    case 1:
                        _k.sent();
                        return [2 /*return*/, despesa];
                }
            });
        });
    };
    return CreateDespesaService;
}());
exports.default = CreateDespesaService;
