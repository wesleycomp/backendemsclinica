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
var Aso_1 = __importDefault(require("@modules/aso/typeorm/entities/Aso"));
var ExamesAso_1 = __importDefault(require("@modules/aso/typeorm/entities/ExamesAso"));
var Empresa_1 = __importDefault(require("@modules/empresa/typeorm/entities/Empresa"));
var ListFechamentoEmpresasService = /** @class */ (function () {
    function ListFechamentoEmpresasService() {
    }
    ListFechamentoEmpresasService.prototype.execute = function (_a) {
        var data_inicial = _a.data_inicial, data_final = _a.data_final, empresa_id = _a.empresa_id;
        return __awaiter(this, void 0, void 0, function () {
            var asoRepo, query;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        asoRepo = (0, typeorm_1.getRepository)(Aso_1.default);
                        query = asoRepo.createQueryBuilder('a')
                            .select('a.empresa_id', 'empresa_id')
                            .addSelect('emp.nome', 'empresa_nome')
                            .addSelect('emp.cnpj', 'empresa_cnpj')
                            .addSelect('COUNT(a.id)', 'total_asos')
                            .addSelect('SUM(ex.valorexame)', 'valor_total')
                            .innerJoin(ExamesAso_1.default, 'ex', 'ex.aso_id = a.id')
                            .innerJoin(Empresa_1.default, 'emp', 'emp.id = a.empresa_id')
                            .where('a.ativo = true')
                            .andWhere('ex.ativo = true')
                            .andWhere('ex.tipopagamento_id = :tp', { tp: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a' })
                            .andWhere('a.dataemissaoaso BETWEEN :inicio AND :fim', {
                            inicio: data_inicial,
                            fim: data_final,
                        });
                        // 👇 filtro adicional se usuário escolheu empresa
                        if (empresa_id) {
                            query.andWhere('a.empresa_id = :empresa_id', { empresa_id: empresa_id });
                        }
                        query.groupBy('a.empresa_id')
                            .addGroupBy('emp.nome')
                            .addGroupBy('emp.cnpj')
                            .orderBy('emp.nome', 'ASC');
                        return [4 /*yield*/, query.getRawMany()];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    return ListFechamentoEmpresasService;
}());
exports.default = ListFechamentoEmpresasService;
