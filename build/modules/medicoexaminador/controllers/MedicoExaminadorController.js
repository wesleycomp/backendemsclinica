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
var ShowMedicoExaminador_1 = __importDefault(require("../services/ShowMedicoExaminador"));
var CreateMedicoExaminadorServices_1 = __importDefault(require("../services/CreateMedicoExaminadorServices"));
var DeleteMedicoExaminadorServices_1 = __importDefault(require("../services/DeleteMedicoExaminadorServices"));
var UpdateMedicosExaminadorServices_1 = __importDefault(require("../services/UpdateMedicosExaminadorServices"));
var MedicoExaminadorController = /** @class */ (function () {
    function MedicoExaminadorController() {
    }
    MedicoExaminadorController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var showMedicoExaminadorService, Medicos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        showMedicoExaminadorService = new ShowMedicoExaminador_1.default();
                        return [4 /*yield*/, showMedicoExaminadorService.ListAllMedicoExaminadorOrder()];
                    case 1:
                        Medicos = _a.sent();
                        return [2 /*return*/, response.json(Medicos)];
                }
            });
        });
    };
    MedicoExaminadorController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, showMedicoExaminadorService, showMedicoExaminador;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        showMedicoExaminadorService = new ShowMedicoExaminador_1.default();
                        return [4 /*yield*/, showMedicoExaminadorService.execute({ id: id })];
                    case 1:
                        showMedicoExaminador = _a.sent();
                        return [2 /*return*/, response.json(showMedicoExaminador)];
                }
            });
        });
    };
    MedicoExaminadorController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, cpf, rg, crm, ufcrm, telefone, datanascimento, endereco, email, createMedicos, Medicos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, nome = _a.nome, cpf = _a.cpf, rg = _a.rg, crm = _a.crm, ufcrm = _a.ufcrm, telefone = _a.telefone, datanascimento = _a.datanascimento, endereco = _a.endereco, email = _a.email;
                        createMedicos = new CreateMedicoExaminadorServices_1.default();
                        return [4 /*yield*/, createMedicos.execute({
                                nome: nome,
                                cpf: cpf,
                                rg: rg,
                                crm: crm,
                                ufcrm: ufcrm,
                                telefone: telefone,
                                datanascimento: datanascimento,
                                endereco: endereco,
                                email: email
                            })];
                    case 1:
                        Medicos = _b.sent();
                        return [2 /*return*/, response.json(Medicos)];
                }
            });
        });
    };
    MedicoExaminadorController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, nome, cpf, rg, crm, ufcrm, telefone, datanascimento, endereco, email, id, updateMedicos, Medicos;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, nome = _a.nome, cpf = _a.cpf, rg = _a.rg, crm = _a.crm, ufcrm = _a.ufcrm, telefone = _a.telefone, datanascimento = _a.datanascimento, endereco = _a.endereco, email = _a.email;
                        id = request.params.id;
                        updateMedicos = new UpdateMedicosExaminadorServices_1.default();
                        return [4 /*yield*/, updateMedicos.execute({
                                id: id,
                                nome: nome,
                                cpf: cpf,
                                rg: rg,
                                crm: crm,
                                ufcrm: ufcrm,
                                telefone: telefone,
                                datanascimento: datanascimento,
                                endereco: endereco,
                                email: email
                            })];
                    case 1:
                        Medicos = _b.sent();
                        return [2 /*return*/, response.json(Medicos)];
                }
            });
        });
    };
    MedicoExaminadorController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteMedicos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteMedicos = new DeleteMedicoExaminadorServices_1.default();
                        return [4 /*yield*/, deleteMedicos.execute({ id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.json([])];
                }
            });
        });
    };
    return MedicoExaminadorController;
}());
exports.default = MedicoExaminadorController;
