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
var AppError_1 = __importDefault(require("@shared/errors/AppError"));
var typeorm_1 = require("typeorm");
var PacientesRepository_1 = require("../typeorm/repositories/PacientesRepository");
var UpdatePacienteService = /** @class */ (function () {
    function UpdatePacienteService() {
    }
    UpdatePacienteService.prototype.execute = function (_a) {
        var id = _a.id, empresa_id = _a.empresa_id, funcao_id = _a.funcao_id, categoriatrabalhador_id = _a.categoriatrabalhador_id, matricula = _a.matricula, dataentradaempresa = _a.dataentradaempresa, descricaoatividade = _a.descricaoatividade, nome = _a.nome, cpf = _a.cpf, rg = _a.rg, telefone = _a.telefone, genero = _a.genero, tiposanguineo = _a.tiposanguineo, nacionalidade_id = _a.nacionalidade_id, nis = _a.nis, ctps = _a.ctps, datanascimento = _a.datanascimento, endereco = _a.endereco, email = _a.email;
        return __awaiter(this, void 0, void 0, function () {
            var pacientesRepository, paciente;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pacientesRepository = (0, typeorm_1.getCustomRepository)(PacientesRepository_1.PacientesRepository);
                        return [4 /*yield*/, pacientesRepository.findOne(id)];
                    case 1:
                        paciente = _b.sent();
                        if (!paciente) {
                            throw new AppError_1.default('Paciente não encontrado.');
                        }
                        console.log('passou aki');
                        paciente.empresa_id = empresa_id,
                            paciente.funcao_id = funcao_id,
                            paciente.categoriatrabalhador_id = categoriatrabalhador_id,
                            paciente.matricula = matricula,
                            paciente.dataentradaempresa = dataentradaempresa,
                            paciente.descricaoatividade = descricaoatividade,
                            paciente.nome = nome;
                        paciente.cpf = cpf;
                        paciente.rg = rg;
                        paciente.telefone = telefone;
                        paciente.genero = genero,
                            paciente.tiposanguineo = tiposanguineo,
                            paciente.nacionalidade_id = nacionalidade_id,
                            paciente.nis = nis,
                            paciente.ctps = ctps,
                            paciente.datanascimento = datanascimento;
                        paciente.endereco = endereco;
                        paciente.email = email;
                        console.log('passou aki 2');
                        return [4 /*yield*/, pacientesRepository.save(paciente)];
                    case 2:
                        _b.sent();
                        console.log('passou ak3');
                        return [2 /*return*/, paciente];
                }
            });
        });
    };
    return UpdatePacienteService;
}());
exports.default = UpdatePacienteService;
