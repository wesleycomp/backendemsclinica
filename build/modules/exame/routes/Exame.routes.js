"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ExameController_1 = __importDefault(require("../controllers/ExameController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var exameRouter = (0, express_1.Router)();
var exameController = new ExameController_1.default();
exameRouter.get('/', isAuthenticated_1.default, exameController.index);
exameRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), exameController.show);
exameRouter.get('/selecionando/localrealizacao', isAuthenticated_1.default, exameController.showExamesPorLocal);
exameRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        procedimento_id: celebrate_1.Joi.string().required(),
        name: celebrate_1.Joi.string().uppercase().required(),
        valoravista: celebrate_1.Joi.number().required(),
        valormedico: celebrate_1.Joi.number().required(),
        valorems: celebrate_1.Joi.number().required(),
        ativo: celebrate_1.Joi.boolean().required(),
        usuariocadastro: celebrate_1.Joi.string().required(),
        usuarioedicao: celebrate_1.Joi.string().allow('', null).default(''),
        localrealizacaoexame: celebrate_1.Joi.string()
    },
    _b)), exameController.create);
exameRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        procedimento_id: celebrate_1.Joi.string().required(),
        name: celebrate_1.Joi.string().uppercase().required(),
        valoravista: celebrate_1.Joi.number().required(),
        valormedico: celebrate_1.Joi.number().required(),
        valorems: celebrate_1.Joi.number().required(),
        ativo: celebrate_1.Joi.boolean().required(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required(),
        usuarioedicao: celebrate_1.Joi.string().required(),
        localrealizacaoexame: celebrate_1.Joi.string()
    },
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), exameController.update);
exameRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), exameController.delete);
exports.default = exameRouter;
