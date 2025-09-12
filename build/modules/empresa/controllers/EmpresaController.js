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
var CreateEmpresaService_1 = __importDefault(require("../services/CreateEmpresaService"));
var DeleteEmpresaService_1 = __importDefault(require("../services/DeleteEmpresaService"));
var ListEmpresaService_1 = __importDefault(require("../services/ListEmpresaService"));
var ShowEmpresaService_1 = __importDefault(require("../services/ShowEmpresaService"));
var UpdateEmpresaService_1 = __importDefault(require("../services/UpdateEmpresaService"));
var SearchEmpresaService_1 = __importDefault(require("../services/SearchEmpresaService"));
var ListFechamentoEmpresasService_1 = __importDefault(require("../services/ListFechamentoEmpresasService"));
var ListExamesPorEmpresaService_1 = __importDefault(require("../services/ListExamesPorEmpresaService"));
var EmpresaController = /** @class */ (function () {
    function EmpresaController() {
    }
    // 🔎 Pesquisa por nome/cnpj (autocomplete)
    EmpresaController.prototype.search = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var search, searchEmpresa, empresas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        search = request.query.search;
                        searchEmpresa = new SearchEmpresaService_1.default();
                        return [4 /*yield*/, searchEmpresa.execute({
                                search: search ? String(search) : undefined,
                            })];
                    case 1:
                        empresas = _a.sent();
                        return [2 /*return*/, response.json(empresas)];
                }
            });
        });
    };
    EmpresaController.prototype.listarExames = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, data_inicial, data_final, service, exames;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.params.id;
                        _a = request.query, data_inicial = _a.data_inicial, data_final = _a.data_final;
                        service = new ListExamesPorEmpresaService_1.default();
                        return [4 /*yield*/, service.execute({
                                empresa_id: String(id),
                                data_inicial: String(data_inicial),
                                data_final: String(data_final),
                            })];
                    case 1:
                        exames = _b.sent();
                        return [2 /*return*/, response.json(exames)];
                }
            });
        });
    };
    // 📊 Agrupamento de exames por empresa (fechamento)
    EmpresaController.prototype.listarAgrupado = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, data_inicial, data_final, empresa_id, service, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.query, data_inicial = _a.data_inicial, data_final = _a.data_final, empresa_id = _a.empresa_id;
                        service = new ListFechamentoEmpresasService_1.default();
                        return [4 /*yield*/, service.execute({
                                data_inicial: String(data_inicial),
                                data_final: String(data_final),
                                empresa_id: empresa_id ? String(empresa_id) : undefined
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    // 📋 Lista todas as empresas (sem filtro)
    EmpresaController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var listEmpresas, empresas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listEmpresas = new ListEmpresaService_1.default();
                        return [4 /*yield*/, listEmpresas.execute()];
                    case 1:
                        empresas = _a.sent();
                        return [2 /*return*/, response.json(empresas)];
                }
            });
        });
    };
    // 🔍 Busca empresa por ID
    EmpresaController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showEmpresas, empresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showEmpresas = new ShowEmpresaService_1.default();
                        return [4 /*yield*/, showEmpresas.execute({ id: id })];
                    case 1:
                        empresa = _a.sent();
                        return [2 /*return*/, response.json(empresa)];
                }
            });
        });
    };
    // 🔍 Busca empresa por ID (método alternativo)
    EmpresaController.prototype.showEmpresaId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showEmpresas, empresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showEmpresas = new ShowEmpresaService_1.default();
                        return [4 /*yield*/, showEmpresas.executePesquisaEmpresaId({ id: id })];
                    case 1:
                        empresa = _a.sent();
                        return [2 /*return*/, response.json(empresa)];
                }
            });
        });
    };
    // 🔍 Busca empresa por Nome
    EmpresaController.prototype.showEmpresaNome = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showEmpresas, empresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showEmpresas = new ShowEmpresaService_1.default();
                        return [4 /*yield*/, showEmpresas.executeEmpresaNome({ id: id })];
                    case 1:
                        empresa = _a.sent();
                        return [2 /*return*/, response.json(empresa)];
                }
            });
        });
    };
    // 🔍 Busca empresa por CNPJ
    EmpresaController.prototype.showEmpresaCnpj = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showEmpresas, empresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showEmpresas = new ShowEmpresaService_1.default();
                        return [4 /*yield*/, showEmpresas.executeEmpresaCnpj({ id: id })];
                    case 1:
                        empresa = _a.sent();
                        return [2 /*return*/, response.json(empresa)];
                }
            });
        });
    };
    // ➕ Criação
    EmpresaController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, cnpj, cpf, inscricaoestadual, inscricaomunicipal, endereco, telefone, email, responsavel, esocial, convenio, observacao, empresafora, createEmpresa, empresa;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, nome = _a.nome, cnpj = _a.cnpj, cpf = _a.cpf, inscricaoestadual = _a.inscricaoestadual, inscricaomunicipal = _a.inscricaomunicipal, endereco = _a.endereco, telefone = _a.telefone, email = _a.email, responsavel = _a.responsavel, esocial = _a.esocial, convenio = _a.convenio, observacao = _a.observacao, empresafora = _a.empresafora;
                        createEmpresa = new CreateEmpresaService_1.default();
                        return [4 /*yield*/, createEmpresa.execute({
                                nome: nome,
                                cnpj: cnpj,
                                cpf: cpf,
                                inscricaoestadual: inscricaoestadual,
                                inscricaomunicipal: inscricaomunicipal,
                                endereco: endereco,
                                telefone: telefone,
                                email: email,
                                responsavel: responsavel,
                                esocial: esocial,
                                convenio: convenio,
                                observacao: observacao,
                                empresafora: empresafora
                            })];
                    case 1:
                        empresa = _b.sent();
                        return [2 /*return*/, response.json(empresa)];
                }
            });
        });
    };
    // ✏️ Atualização
    EmpresaController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, cnpj, cpf, inscricaoestadual, inscricaomunicipal, endereco, telefone, email, responsavel, esocial, convenio, observacao, empresafora, id, updateEmpresa, empresa;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, nome = _a.nome, cnpj = _a.cnpj, cpf = _a.cpf, inscricaoestadual = _a.inscricaoestadual, inscricaomunicipal = _a.inscricaomunicipal, endereco = _a.endereco, telefone = _a.telefone, email = _a.email, responsavel = _a.responsavel, esocial = _a.esocial, convenio = _a.convenio, observacao = _a.observacao, empresafora = _a.empresafora;
                        id = request.params.id;
                        updateEmpresa = new UpdateEmpresaService_1.default();
                        return [4 /*yield*/, updateEmpresa.execute({
                                id: id,
                                nome: nome,
                                cnpj: cnpj,
                                cpf: cpf,
                                inscricaoestadual: inscricaoestadual,
                                inscricaomunicipal: inscricaomunicipal,
                                endereco: endereco,
                                telefone: telefone,
                                email: email,
                                responsavel: responsavel,
                                esocial: esocial,
                                convenio: convenio,
                                observacao: observacao,
                                empresafora: empresafora
                            })];
                    case 1:
                        empresa = _b.sent();
                        return [2 /*return*/, response.json(empresa)];
                }
            });
        });
    };
    // 🗑️ Exclusão
    EmpresaController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteEmpresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteEmpresa = new DeleteEmpresaService_1.default();
                        return [4 /*yield*/, deleteEmpresa.execute({ id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.json([])];
                }
            });
        });
    };
    return EmpresaController;
}());
exports.default = EmpresaController;
