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
var ListFechamentosService = /** @class */ (function () {
    function ListFechamentosService() {
    }
    ListFechamentosService.prototype.execute = function (_a) {
        var _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.per_page, per_page = _c === void 0 ? 10 : _c, empresa_id = _a.empresa_id, status = _a.status, data_inicial = _a.data_inicial, data_final = _a.data_final;
        return __awaiter(this, void 0, void 0, function () {
            var repo, query, total, fechamentos, items;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        repo = (0, typeorm_1.getRepository)(Fechamento_1.default);
                        query = repo
                            .createQueryBuilder('fechamento')
                            .leftJoinAndSelect('fechamento.empresa', 'empresa');
                        // 🔎 filtro por empresa_id (select)
                        if (empresa_id) {
                            query.andWhere('empresa.id = :empresa_id', { empresa_id: empresa_id });
                        }
                        // 🔎 filtro por status
                        if (status) {
                            query.andWhere('fechamento.status = :status', { status: status });
                        }
                        // 🔎 filtro por período (data_fechamento)
                        if (data_inicial && data_final) {
                            query.andWhere('fechamento.data_fechamento BETWEEN :ini AND :fim', {
                                ini: data_inicial,
                                fim: data_final,
                            });
                        }
                        else if (data_inicial) {
                            query.andWhere('fechamento.data_fechamento >= :ini', { ini: data_inicial });
                        }
                        else if (data_final) {
                            query.andWhere('fechamento.data_fechamento <= :fim', { fim: data_final });
                        }
                        query.orderBy('fechamento.data_fechamento', 'DESC');
                        return [4 /*yield*/, query.getCount()
                            // 🔹 aplica paginação
                        ];
                    case 1:
                        total = _d.sent();
                        return [4 /*yield*/, query
                                .skip((page - 1) * per_page)
                                .take(per_page)
                                .getMany()
                            // 🔹 mapeia resultado para incluir empresa_nome e empresa_cnpj
                        ];
                    case 2:
                        fechamentos = _d.sent();
                        items = fechamentos.map(function (f) { return ({
                            id: f.id,
                            empresa_id: f.empresa_id,
                            empresa_nome: f.empresa ? f.empresa.nome : '',
                            empresa_cnpj: f.empresa ? f.empresa.cnpj : '',
                            valor_total: Number(f.valor_total || 0),
                            valor_pago: Number(f.valor_pago || 0),
                            status: f.status,
                            data_pagamento: f.data_pagamento,
                            data_fechamento: f.data_fechamento || f.created_at,
                            created_at: f.created_at,
                        }); });
                        return [2 /*return*/, {
                                items: items,
                                total: total,
                                page: page,
                                per_page: per_page,
                            }];
                }
            });
        });
    };
    return ListFechamentosService;
}());
exports.default = ListFechamentosService;
