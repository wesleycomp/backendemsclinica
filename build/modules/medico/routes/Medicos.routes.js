"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MedicosController_1 = __importDefault(require("../controllers/MedicosController"));
var MedicoFechamentoController_1 = __importDefault(require("../controllers/MedicoFechamentoController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var MedicosRouter = (0, express_1.Router)();
var medicosController = new MedicosController_1.default();
var FechamentoMedicoController = new MedicoFechamentoController_1.default();
MedicosRouter.get('/', isAuthenticated_1.default, medicosController.index);
MedicosRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), medicosController.show);
MedicosRouter.get('/medicoativo/list', isAuthenticated_1.default, medicosController.getMedicoAtivoAll);
MedicosRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        nome: celebrate_1.Joi.string().uppercase().required(),
        cpf: celebrate_1.Joi.string().required(),
        rg: celebrate_1.Joi.string(),
        crm: celebrate_1.Joi.string().required(),
        ufcrm: celebrate_1.Joi.string().required(),
        telefone: celebrate_1.Joi.string().required(),
        datanascimento: celebrate_1.Joi.string().required(),
        endereco: celebrate_1.Joi.string(),
        email: celebrate_1.Joi.string()
    },
    _b)), medicosController.create);
MedicosRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        nome: celebrate_1.Joi.string().uppercase().required(),
        cpf: celebrate_1.Joi.string().required(),
        rg: celebrate_1.Joi.string(),
        crm: celebrate_1.Joi.string().required(),
        ufcrm: celebrate_1.Joi.string().required(),
        telefone: celebrate_1.Joi.string().required(),
        datanascimento: celebrate_1.Joi.string().required(),
        endereco: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string(),
        ativo: celebrate_1.Joi.boolean(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required()
    },
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), medicosController.update);
MedicosRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), medicosController.delete);
MedicosRouter.get('/fechamentomedico/:medico_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.PARAMS] = {
        medico_id: celebrate_1.Joi.string().uuid().required(),
    },
    _e)), FechamentoMedicoController.show);
MedicosRouter.post('/fechamentomedico', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_f = {},
    _f[celebrate_1.Segments.BODY] = {
        medico_id: celebrate_1.Joi.string().required(),
        exame_id: celebrate_1.Joi.string().required(),
        valor: celebrate_1.Joi.number().required()
    },
    _f)), FechamentoMedicoController.create);
MedicosRouter.put('/fechamentomedico/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_g = {},
    _g[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        medico_id: celebrate_1.Joi.string().required(),
        exame_id: celebrate_1.Joi.string().required(),
        valor: celebrate_1.Joi.number().required(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required()
    },
    _g[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _g)), FechamentoMedicoController.update);
MedicosRouter.delete('/fechamentomedico/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_h = {},
    _h[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _h)), FechamentoMedicoController.delete);
exports.default = MedicosRouter;
