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
var Fechamento_1 = __importDefault(require("../typeorm/entities/Fechamento"));
var FechamentoAso_1 = __importDefault(require("../typeorm/entities/FechamentoAso"));
var ExamesAso_1 = __importDefault(require("@modules/aso/typeorm/entities/ExamesAso"));
var CreateFechamentoService = /** @class */ (function () {
    function CreateFechamentoService() {
    }
    CreateFechamentoService.prototype.execute = function (_a) {
        var empresa_id = _a.empresa_id, data_inicial = _a.data_inicial, data_final = _a.data_final, criado_por = _a.criado_por, exameaso_ids = _a.exameaso_ids;
        return __awaiter(this, void 0, void 0, function () {
            var fechamentoRepo, fechamentoAsoRepo, exameAsoRepo, exames, valor_total, fechamento, itens;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fechamentoRepo = (0, typeorm_1.getRepository)(Fechamento_1.default);
                        fechamentoAsoRepo = (0, typeorm_1.getRepository)(FechamentoAso_1.default);
                        exameAsoRepo = (0, typeorm_1.getRepository)(ExamesAso_1.default);
                        return [4 /*yield*/, exameAsoRepo.find({
                                where: {
                                    id: (0, typeorm_1.In)(exameaso_ids),
                                    ativo: true,
                                    tipopagamento_id: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a'
                                },
                                relations: ['aso'],
                            })];
                    case 1:
                        exames = _b.sent();
                        if (!exames.length) {
                            throw new Error('Nenhum exame válido encontrado para cobrança');
                        }
                        valor_total = exames.reduce(function (acc, ex) { return acc + Number(ex.valorexame || 0); }, 0);
                        fechamento = fechamentoRepo.create({
                            empresa_id: empresa_id,
                            data_inicial: data_inicial,
                            data_final: data_final,
                            criado_por: criado_por,
                            valor_total: valor_total,
                            status: 'aberto',
                            valor_pago: 0,
                            data_pagamento: null,
                        });
                        return [4 /*yield*/, fechamentoRepo.save(fechamento)
                            // 🔗 Vincular ASOs ao fechamento
                        ];
                    case 2:
                        _b.sent();
                        itens = exames.map(function (ex) {
                            return fechamentoAsoRepo.create({
                                fechamento_id: fechamento.id,
                                aso_id: ex.aso_id,
                                valor: ex.valorexame,
                            });
                        });
                        return [4 /*yield*/, fechamentoAsoRepo.save(itens)
                            // ❌ Atualizar exames para inativos
                        ];
                    case 3:
                        _b.sent();
                        // ❌ Atualizar exames para inativos
                        return [4 /*yield*/, exameAsoRepo.update({ id: (0, typeorm_1.In)(exameaso_ids) }, { ativo: false })
                            // carregar asos vinculados
                        ];
                    case 4:
                        // ❌ Atualizar exames para inativos
                        _b.sent();
                        // carregar asos vinculados
                        fechamento.asos = itens;
                        return [2 /*return*/, fechamento];
                }
            });
        });
    };
    return CreateFechamentoService;
}());
exports.default = CreateFechamentoService;
