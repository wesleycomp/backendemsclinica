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
var CreateConvenioEmpresaService_1 = __importDefault(require("../services/CreateConvenioEmpresaService"));
var DeleteConvenioEmpresaService_1 = __importDefault(require("../services/DeleteConvenioEmpresaService"));
var ListConvenioEmpresaService_1 = __importDefault(require("../services/ListConvenioEmpresaService"));
var ShowConvenioEmpresaService_1 = __importDefault(require("../services/ShowConvenioEmpresaService"));
var UpdateConvenioEmpresaService_1 = __importDefault(require("../services/UpdateConvenioEmpresaService"));
var ConvenioEmpresaController = /** @class */ (function () {
    function ConvenioEmpresaController() {
    }
    ConvenioEmpresaController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var listConvenioEmpresa, ConvenioEmpresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listConvenioEmpresa = new ListConvenioEmpresaService_1.default();
                        return [4 /*yield*/, listConvenioEmpresa.execute()];
                    case 1:
                        ConvenioEmpresa = _a.sent();
                        return [2 /*return*/, response.json(ConvenioEmpresa)];
                }
            });
        });
    };
    ConvenioEmpresaController.prototype.show = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var empresa_id, showConvenioEmpresa, ConvenioEmpresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        empresa_id = request.params.empresa_id;
                        showConvenioEmpresa = new ShowConvenioEmpresaService_1.default();
                        return [4 /*yield*/, showConvenioEmpresa.execute({ empresa_id: empresa_id })];
                    case 1:
                        ConvenioEmpresa = _a.sent();
                        return [2 /*return*/, response.json(ConvenioEmpresa)];
                }
            });
        });
    };
    ConvenioEmpresaController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, empresa_id, exame_id, valorexame, valormedico, valorems, ativo, user_id, createConvenioEmpresa, ConvenioEmpresa;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, empresa_id = _a.empresa_id, exame_id = _a.exame_id, valorexame = _a.valorexame, valormedico = _a.valormedico, valorems = _a.valorems, ativo = _a.ativo, user_id = _a.user_id;
                        createConvenioEmpresa = new CreateConvenioEmpresaService_1.default();
                        return [4 /*yield*/, createConvenioEmpresa.execute({
                                empresa_id: empresa_id,
                                exame_id: exame_id,
                                valorexame: valorexame,
                                valormedico: valormedico,
                                valorems: valorems,
                                ativo: ativo,
                                user_id: user_id
                            })];
                    case 1:
                        ConvenioEmpresa = _b.sent();
                        return [2 /*return*/, response.json(ConvenioEmpresa)];
                }
            });
        });
    };
    ConvenioEmpresaController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, empresa_id, exame_id, valorexame, valormedico, valorems, ativo, user_id, id, updateConvenioEmpresa, ConvenioEmpresa;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, empresa_id = _a.empresa_id, exame_id = _a.exame_id, valorexame = _a.valorexame, valormedico = _a.valormedico, valorems = _a.valorems, ativo = _a.ativo, user_id = _a.user_id;
                        id = request.params.id;
                        updateConvenioEmpresa = new UpdateConvenioEmpresaService_1.default();
                        return [4 /*yield*/, updateConvenioEmpresa.execute({
                                id: id,
                                empresa_id: empresa_id,
                                exame_id: exame_id,
                                valorexame: valorexame,
                                valormedico: valormedico,
                                valorems: valorems,
                                ativo: ativo,
                                user_id: user_id
                            })];
                    case 1:
                        ConvenioEmpresa = _b.sent();
                        return [2 /*return*/, response.json(ConvenioEmpresa)];
                }
            });
        });
    };
    ConvenioEmpresaController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteConvenioEmpresa;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        deleteConvenioEmpresa = new DeleteConvenioEmpresaService_1.default();
                        return [4 /*yield*/, deleteConvenioEmpresa.execute({ id: id })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.json([])];
                }
            });
        });
    };
    return ConvenioEmpresaController;
}());
exports.default = ConvenioEmpresaController;
