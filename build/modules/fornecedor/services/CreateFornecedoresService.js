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
var FornecedorRepository_1 = require("../typeorm/repositories/FornecedorRepository");
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var CreateFornecedorService = /** @class */ (function () {
    function CreateFornecedorService() {
    }
    CreateFornecedorService.prototype.execute = function (_a) {
        var nome = _a.nome, cnpj = _a.cnpj, cpf = _a.cpf, inscricaoestadual = _a.inscricaoestadual, inscricaomunicipal = _a.inscricaomunicipal, endereco = _a.endereco, telefone = _a.telefone, email = _a.email, responsavel = _a.responsavel, ehlaboratorio = _a.ehlaboratorio;
        return __awaiter(this, void 0, void 0, function () {
            var fornecedorRepository, fornecedorExists, fornecedor;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        fornecedorRepository = (0, typeorm_1.getCustomRepository)(FornecedorRepository_1.FornecedorRepository);
                        return [4 /*yield*/, fornecedorRepository.findByName(nome)];
                    case 1:
                        fornecedorExists = _b.sent();
                        if (fornecedorExists) {
                            throw new AppError_1.default('Fornecedor ja existente');
                        }
                        fornecedor = fornecedorRepository.create({
                            nome: nome,
                            cnpj: cnpj,
                            inscricaoestadual: inscricaoestadual,
                            inscricaomunicipal: inscricaomunicipal,
                            endereco: endereco,
                            telefone: telefone,
                            email: email,
                            responsavel: responsavel,
                            ehlaboratorio: ehlaboratorio
                        });
                        return [4 /*yield*/, fornecedorRepository.save(fornecedor)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, fornecedor];
                }
            });
        });
    };
    return CreateFornecedorService;
}());
exports.default = CreateFornecedorService;
