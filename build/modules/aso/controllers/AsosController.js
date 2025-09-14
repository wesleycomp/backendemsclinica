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
var CreateAsosService_1 = __importDefault(require("../services/CreateAsosService"));
var CreateXMLService_1 = __importDefault(require("../services/CreateXMLService"));
var CreateTxt2Tecnospeed_1 = __importDefault(require("../services/CreateTxt2Tecnospeed"));
var DeleteAsosService_1 = __importDefault(require("../services/DeleteAsosService"));
var ListAsosService_1 = __importDefault(require("../services/ListAsosService"));
var ShowAsosService_1 = __importDefault(require("../services/ShowAsosService"));
var ShowFichaExameService_1 = __importDefault(require("../services/ShowFichaExameService"));
var UpdateAsosService_1 = __importDefault(require("../services/UpdateAsosService"));
var DeleteExameAsoService_1 = __importDefault(require("../services/DeleteExameAsoService"));
var DeleteFichaClinicaService_1 = __importDefault(require("@modules/fichaclinica/services/DeleteFichaClinicaService"));
var ShowHistoricoEdicaoAsoService_1 = __importDefault(require("../services/ShowHistoricoEdicaoAsoService"));
var ShowAsosService_2 = __importDefault(require("../services/ShowAsosService"));
var CreateHistoricoAsoExcluidaService_1 = __importDefault(require("../services/CreateHistoricoAsoExcluidaService"));
var ShowExamesAsosService_1 = __importDefault(require("../services/ShowExamesAsosService"));
var CreatehistoricoExameAsoExcluidoService_1 = __importDefault(require("../services/CreatehistoricoExameAsoExcluidoService"));
var ShowExamesAsosService_2 = __importDefault(require("../services/ShowExamesAsosService"));
var AsosController = /** @class */ (function () {
    function AsosController() {
    }
    AsosController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var listExame, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listExame = new ListAsosService_1.default();
                        return [4 /*yield*/, listExame.execute()];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    AsosController.prototype.showAsosExcluidasPeriodo = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var datainicio, datafim, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datainicio = request.params.datainicio;
                        datafim = request.params.datafim;
                        showExameAso = new ShowExamesAsosService_2.default();
                        return [4 /*yield*/, showExameAso.executeAsosExlcuidasPeriodo(datainicio, datafim)];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    AsosController.prototype.showAsosEditadasPeriodo = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var datainicio, datafim, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datainicio = request.params.datainicio;
                        datafim = request.params.datafim;
                        showExameAso = new ShowExamesAsosService_2.default();
                        return [4 /*yield*/, showExameAso.executeAsosEditadasPeriodo(datainicio, datafim)];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    AsosController.prototype.searcNomeEmpresaAso = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var nomeempresa, listAsos, asos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nomeempresa = request.params.nomeempresa;
                        listAsos = new ListAsosService_1.default();
                        return [4 /*yield*/, listAsos.pesquisaAsoNomeEmpresa(nomeempresa)];
                    case 1:
                        asos = _a.sent();
                        return [2 /*return*/, response.json(asos)];
                }
            });
        });
    };
    AsosController.prototype.searcCnpjEmpresaAso = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cnpj, listAsos, asos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cnpj = request.params.cnpj;
                        listAsos = new ListAsosService_1.default();
                        return [4 /*yield*/, listAsos.pesquisaAsoCnpjEmpresa(cnpj)];
                    case 1:
                        asos = _a.sent();
                        return [2 /*return*/, response.json(asos)];
                }
            });
        });
    };
    AsosController.prototype.searcNomePacienteAso = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var nomepaciente, listAsos, asos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        nomepaciente = request.params.nomepaciente;
                        listAsos = new ListAsosService_1.default();
                        return [4 /*yield*/, listAsos.pesquisaAsoNomePaciente(nomepaciente)];
                    case 1:
                        asos = _a.sent();
                        return [2 /*return*/, response.json(asos)];
                }
            });
        });
    };
    AsosController.prototype.searcCpfPacienteAso = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var cpf, listAsos, asos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cpf = request.params.cpf;
                        listAsos = new ListAsosService_1.default();
                        return [4 /*yield*/, listAsos.pesquisaAsoCpfPaciente(cpf)];
                    case 1:
                        asos = _a.sent();
                        return [2 /*return*/, response.json(asos)];
                }
            });
        });
    };
    AsosController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showExame, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showExame = new ShowAsosService_1.default();
                        return [4 /*yield*/, showExame.execute({ id: id })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    AsosController.prototype.showFichaExame = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showExame, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showExame = new ShowFichaExameService_1.default();
                        return [4 /*yield*/, showExame.execute({ id: id })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    AsosController.prototype.geraXML = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var aso_id, geraXml, xml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aso_id = request.params.aso_id;
                        geraXml = new CreateXMLService_1.default();
                        return [4 /*yield*/, geraXml.execute({ aso_id: aso_id })];
                    case 1:
                        xml = _a.sent();
                        return [2 /*return*/, response.json(xml)];
                }
            });
        });
    };
    AsosController.prototype.geraTXT2TecnoSpeed = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var aso_id, geraXml, xml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        aso_id = request.params.aso_id;
                        geraXml = new CreateTxt2Tecnospeed_1.default();
                        return [4 /*yield*/, geraXml.execute({ aso_id: aso_id })];
                    case 1:
                        xml = _a.sent();
                        return [2 /*return*/, response.json(xml)];
                }
            });
        });
    };
    AsosController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dataemissaoaso, paciente_id, empresa_id, funcao_id, tipoaso_id, medico_id, medicoexaminador_id, resultado, user_edit, tipopagamento_id, transmissaoesocial, ativo, user_id, createExame, exame;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, dataemissaoaso = _a.dataemissaoaso, paciente_id = _a.paciente_id, empresa_id = _a.empresa_id, funcao_id = _a.funcao_id, tipoaso_id = _a.tipoaso_id, medico_id = _a.medico_id, medicoexaminador_id = _a.medicoexaminador_id, resultado = _a.resultado, user_edit = _a.user_edit, tipopagamento_id = _a.tipopagamento_id, transmissaoesocial = _a.transmissaoesocial, ativo = _a.ativo, user_id = _a.user_id;
                        createExame = new CreateAsosService_1.default();
                        return [4 /*yield*/, createExame.execute({
                                dataemissaoaso: dataemissaoaso,
                                paciente_id: paciente_id,
                                empresa_id: empresa_id,
                                funcao_id: funcao_id,
                                tipoaso_id: tipoaso_id,
                                medico_id: medico_id,
                                medicoexaminador_id: medicoexaminador_id,
                                resultado: resultado,
                                user_edit: user_edit,
                                tipopagamento_id: tipopagamento_id,
                                transmissaoesocial: transmissaoesocial,
                                ativo: ativo,
                                user_id: user_id
                            })];
                    case 1:
                        exame = _b.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    AsosController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, dataemissaoaso, paciente_id, empresa_id, funcao_id, tipoaso_id, medico_id, medicoexaminador_id, resultado, user_edit, tipopagamento_id, transmissaoesocial, ativo, user_id, motivo, id, updateExame, exame;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, dataemissaoaso = _a.dataemissaoaso, paciente_id = _a.paciente_id, empresa_id = _a.empresa_id, funcao_id = _a.funcao_id, tipoaso_id = _a.tipoaso_id, medico_id = _a.medico_id, medicoexaminador_id = _a.medicoexaminador_id, resultado = _a.resultado, user_edit = _a.user_edit, tipopagamento_id = _a.tipopagamento_id, transmissaoesocial = _a.transmissaoesocial, ativo = _a.ativo, user_id = _a.user_id, motivo = _a.motivo;
                        id = request.params.id;
                        updateExame = new UpdateAsosService_1.default();
                        return [4 /*yield*/, updateExame.execute({
                                id: id,
                                dataemissaoaso: dataemissaoaso,
                                paciente_id: paciente_id,
                                empresa_id: empresa_id,
                                funcao_id: funcao_id,
                                tipoaso_id: tipoaso_id,
                                medico_id: medico_id,
                                medicoexaminador_id: medicoexaminador_id,
                                resultado: resultado,
                                user_edit: user_edit,
                                tipopagamento_id: tipopagamento_id,
                                transmissaoesocial: transmissaoesocial,
                                ativo: ativo,
                                user_id: user_id,
                                motivo: motivo
                            })];
                    case 1:
                        exame = _b.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    AsosController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, user_exclusao, motivo, deleteExamesAso, deleteAso, deleteFichaClinicaAso, asoService, historicoAsosExcluidasService, historicoExameAsoExcluidaService, aso, asoExameAsoService, aso_id, exameAso, dataemissaoaso, paciente_id, empresa_id, funcao_id, tipoaso_id, medico_id, medicoexaminador_id, resultado, transmissaoesocial, ativo, created_at, updated_at, user_id, user_edit, codigoaso, tipopagamento_id, data_criacao;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, id = _a.id, user_exclusao = _a.user_exclusao, motivo = _a.motivo;
                        deleteExamesAso = new DeleteExameAsoService_1.default();
                        deleteAso = new DeleteAsosService_1.default();
                        deleteFichaClinicaAso = new DeleteFichaClinicaService_1.default();
                        asoService = new ShowAsosService_1.default();
                        historicoAsosExcluidasService = new CreateHistoricoAsoExcluidaService_1.default();
                        historicoExameAsoExcluidaService = new CreatehistoricoExameAsoExcluidoService_1.default();
                        return [4 /*yield*/, asoService.execute({ id: id })];
                    case 1:
                        aso = _b.sent();
                        asoExameAsoService = new ShowExamesAsosService_1.default();
                        aso_id = aso.id;
                        return [4 /*yield*/, asoExameAsoService.execute({ aso_id: aso_id })];
                    case 2:
                        exameAso = _b.sent();
                        //popula o objeto com os dados dos exames aso a ser excluida em um laco FOR
                        exameAso.forEach(function (item) {
                            var aso_id = item.aso_id;
                            var exame_id = item.exame_id;
                            var ativo = item.ativo;
                            var created_at = item.created_at;
                            var updated_at = item.updated_at;
                            var valorexamesemdesconto = item.valorexamesemdesconto;
                            var valorexame = item.valorexame;
                            var valormedico = item.valormedico;
                            var valorems = item.valorems;
                            var tipopagamento_id = item.tipopagamento_id;
                            var user_id = item.user_id;
                            var user_desconto = item.user_desconto;
                            var desconto = item.desconto;
                            //guarda os dados dos exames da ASO a sereme excluidos na tabela historico__exameaso_excluido
                            historicoExameAsoExcluidaService.execute({
                                aso_id: aso_id,
                                exame_id: exame_id,
                                ativo: ativo,
                                created_at: created_at,
                                updated_at: updated_at,
                                valorexamesemdesconto: valorexamesemdesconto,
                                valorexame: valorexame,
                                valormedico: valormedico,
                                valorems: valorems,
                                tipopagamento_id: tipopagamento_id,
                                user_id: user_id,
                                user_desconto: user_desconto,
                                desconto: desconto,
                            });
                        });
                        dataemissaoaso = aso.dataemissaoaso;
                        paciente_id = aso.paciente_id;
                        empresa_id = aso.empresa_id;
                        funcao_id = aso.funcao_id;
                        tipoaso_id = aso.tipoaso_id;
                        medico_id = aso.medico_id;
                        medicoexaminador_id = aso.medicoexaminador_id;
                        resultado = aso.resultado;
                        transmissaoesocial = aso.transmissaoesocial;
                        ativo = aso.ativo;
                        created_at = aso.created_at;
                        updated_at = aso.updated_at;
                        user_id = aso.user_id;
                        user_edit = aso.user_edit;
                        codigoaso = aso.codigoaso;
                        tipopagamento_id = aso.tipopagamento_id;
                        data_criacao = aso.data_criacao;
                        //guarda os dados da aso a ser  excluida na tabela historico_aso_excluida
                        return [4 /*yield*/, historicoAsosExcluidasService.execute({
                                aso_id: aso_id,
                                dataemissaoaso: dataemissaoaso,
                                paciente_id: paciente_id,
                                empresa_id: empresa_id,
                                funcao_id: funcao_id,
                                tipoaso_id: tipoaso_id,
                                medico_id: medico_id,
                                medicoexaminador_id: medicoexaminador_id,
                                resultado: resultado,
                                transmissaoesocial: transmissaoesocial,
                                ativo: ativo,
                                created_at: created_at,
                                updated_at: updated_at,
                                user_id: user_id,
                                user_edit: user_edit,
                                codigoaso: codigoaso,
                                tipopagamento_id: tipopagamento_id,
                                data_criacao: data_criacao,
                                user_exclusao: user_exclusao,
                                motivo: motivo
                            })];
                    case 3:
                        //guarda os dados da aso a ser  excluida na tabela historico_aso_excluida
                        _b.sent();
                        return [4 /*yield*/, deleteExamesAso.deleteExameAso({ id: id })]; // corrigi
                    case 4:
                        _b.sent(); // corrigi
                        return [4 /*yield*/, deleteFichaClinicaAso.execute({ id: id })];
                    case 5:
                        _b.sent();
                        return [4 /*yield*/, deleteAso.execute({ id: id, user_exclusao: user_exclusao })];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, response.json([])];
                }
            });
        });
    };
    AsosController.prototype.showAsosEditadas = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var showAsosEditadas, asosEditadas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        showAsosEditadas = new ShowHistoricoEdicaoAsoService_1.default();
                        return [4 /*yield*/, showAsosEditadas.listAsosEditadas()];
                    case 1:
                        asosEditadas = _a.sent();
                        return [2 /*return*/, response.json(asosEditadas)];
                }
            });
        });
    };
    AsosController.prototype.showAsosCriadas = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var showAsosCriadas, asosCriadas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        showAsosCriadas = new ShowAsosService_2.default();
                        return [4 /*yield*/, showAsosCriadas.listAsosCriadas()];
                    case 1:
                        asosCriadas = _a.sent();
                        return [2 /*return*/, response.json(asosCriadas)];
                }
            });
        });
    };
    AsosController.prototype.showAsosExcluidas = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var showAsosExcluidas, asosExcluidas;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        showAsosExcluidas = new ShowAsosService_2.default();
                        return [4 /*yield*/, showAsosExcluidas.listAsosExcluidas()];
                    case 1:
                        asosExcluidas = _a.sent();
                        return [2 /*return*/, response.json(asosExcluidas)];
                }
            });
        });
    };
    AsosController.prototype.showRelatorioFechamento = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var datainicio, datafim, tipopagamento, empresa, empresafora, showExameAso, exame;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        datainicio = request.params.datainicio;
                        datafim = request.params.datafim;
                        tipopagamento = request.params.tipopagamento;
                        empresa = request.params.empresa;
                        empresafora = request.params.empresafora;
                        showExameAso = new ShowAsosService_2.default();
                        return [4 /*yield*/, showExameAso.executeRelatorioFechamento({ datainicio: datainicio, datafim: datafim, empresa: empresa, tipopagamento: tipopagamento, empresafora: empresafora })];
                    case 1:
                        exame = _a.sent();
                        return [2 /*return*/, response.json(exame)];
                }
            });
        });
    };
    return AsosController;
}());
exports.default = AsosController;
