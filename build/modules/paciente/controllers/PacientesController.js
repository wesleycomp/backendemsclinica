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
var CreatePacientesServices_1 = __importDefault(require("../services/CreatePacientesServices"));
var DeletePacientesServices_1 = __importDefault(require("../services/DeletePacientesServices"));
var ListPacientesServices_1 = __importDefault(require("../services/ListPacientesServices"));
var ShowPacientesServices_1 = __importDefault(require("../services/ShowPacientesServices"));
var UpdatePacientesServices_1 = __importDefault(require("../services/UpdatePacientesServices"));
var PacientesController = /** @class */ (function () {
    function PacientesController() {
    }
    PacientesController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var listPacientes, pacientes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listPacientes = new ListPacientesServices_1.default();
                        return [4 /*yield*/, listPacientes.execute()];
                    case 1:
                        pacientes = _a.sent();
                        return [2 /*return*/, response.json(pacientes)];
                }
            });
        });
    };
    PacientesController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showPacientes, pacientes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showPacientes = new ShowPacientesServices_1.default();
                        return [4 /*yield*/, showPacientes.execute({ id: id })];
                    case 1:
                        pacientes = _a.sent();
                        return [2 /*return*/, response.json(pacientes)];
                }
            });
        });
    };
    PacientesController.prototype.showPacienteNome = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showPacientes, paciente;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showPacientes = new ShowPacientesServices_1.default();
                        return [4 /*yield*/, showPacientes.executePacienteNome({ id: id })];
                    case 1:
                        paciente = _a.sent();
                        return [2 /*return*/, response.json(paciente)];
                }
            });
        });
    };
    PacientesController.prototype.showPacienteCpf = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showPacientes, paciente;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showPacientes = new ShowPacientesServices_1.default();
                        return [4 /*yield*/, showPacientes.executePacienteCpf({ id: id })];
                    case 1:
                        paciente = _a.sent();
                        return [2 /*return*/, response.json(paciente)];
                }
            });
        });
    };
    PacientesController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, empresa_id, funcao_id, categoriatrabalhador_id, matricula, dataentradaempresa, descricaoatividade, nome, cpf, rg, telefone, datanascimento, endereco, email, genero, tiposanguineo, nacionalidade_id, nis, ctps, createPacientes, pacientes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, empresa_id = _a.empresa_id, funcao_id = _a.funcao_id, categoriatrabalhador_id = _a.categoriatrabalhador_id, matricula = _a.matricula, dataentradaempresa = _a.dataentradaempresa, descricaoatividade = _a.descricaoatividade, nome = _a.nome, cpf = _a.cpf, rg = _a.rg, telefone = _a.telefone, datanascimento = _a.datanascimento, endereco = _a.endereco, email = _a.email, genero = _a.genero, tiposanguineo = _a.tiposanguineo, nacionalidade_id = _a.nacionalidade_id, nis = _a.nis, ctps = _a.ctps;
                        createPacientes = new CreatePacientesServices_1.default();
                        return [4 /*yield*/, createPacientes.execute({
                                empresa_id: empresa_id,
                                funcao_id: funcao_id,
                                categoriatrabalhador_id: categoriatrabalhador_id,
                                matricula: matricula,
                                dataentradaempresa: dataentradaempresa,
                                descricaoatividade: descricaoatividade,
                                nome: nome,
                                cpf: cpf,
                                rg: rg,
                                telefone: telefone,
                                datanascimento: datanascimento,
                                endereco: endereco,
                                email: email,
                                genero: genero,
                                tiposanguineo: tiposanguineo,
                                nacionalidade_id: nacionalidade_id,
                                nis: nis,
                                ctps: ctps
                            })];
                    case 1:
                        pacientes = _b.sent();
                        return [2 /*return*/, response.json(pacientes)];
                }
            });
        });
    };
    PacientesController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, empresa_id, funcao_id, categoriatrabalhador_id, matricula, dataentradaempresa, descricaoatividade, nome, cpf, rg, telefone, datanascimento, endereco, email, genero, tiposanguineo, nacionalidade_id, nis, ctps, id, updatePacientes, pacientes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, empresa_id = _a.empresa_id, funcao_id = _a.funcao_id, categoriatrabalhador_id = _a.categoriatrabalhador_id, matricula = _a.matricula, dataentradaempresa = _a.dataentradaempresa, descricaoatividade = _a.descricaoatividade, nome = _a.nome, cpf = _a.cpf, rg = _a.rg, telefone = _a.telefone, datanascimento = _a.datanascimento, endereco = _a.endereco, email = _a.email, genero = _a.genero, tiposanguineo = _a.tiposanguineo, nacionalidade_id = _a.nacionalidade_id, nis = _a.nis, ctps = _a.ctps;
                        id = request.params.id;
                        updatePacientes = new UpdatePacientesServices_1.default();
                        return [4 /*yield*/, updatePacientes.execute({
                                id: id,
                                empresa_id: empresa_id,
                                funcao_id: funcao_id,
                                categoriatrabalhador_id: categoriatrabalhador_id,
                                matricula: matricula,
                                dataentradaempresa: dataentradaempresa,
                                descricaoatividade: descricaoatividade,
                                nome: nome,
                                cpf: cpf,
                                rg: rg,
                                telefone: telefone,
                                datanascimento: datanascimento,
                                endereco: endereco,
                                email: email,
                                genero: genero,
                                tiposanguineo: tiposanguineo,
                                nacionalidade_id: nacionalidade_id,
                                nis: nis,
                                ctps: ctps
                            })];
                    case 1:
                        pacientes = _b.sent();
                        return [2 /*return*/, response.json(pacientes)];
                }
            });
        });
    };
    PacientesController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deletePacientes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deletePacientes = new DeletePacientesServices_1.default();
                        return [4 /*yield*/, deletePacientes.execute({ id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.json([])];
                }
            });
        });
    };
    return PacientesController;
}());
exports.default = PacientesController;
