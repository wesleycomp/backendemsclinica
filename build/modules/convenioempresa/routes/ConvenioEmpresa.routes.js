"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ConvenioEmpresaController_1 = __importDefault(require("../controllers/ConvenioEmpresaController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var convenioempresaRouter = (0, express_1.Router)();
var convenioempresaController = new ConvenioEmpresaController_1.default();
//convenioempresaRouter.get('/',  convenioempresaController.index)
convenioempresaRouter.get('/:empresa_id', 
// isAuthenticated,
(0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        empresa_id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), convenioempresaController.show);
convenioempresaRouter.post('/', 
// isAuthenticated,
(0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        empresa_id: celebrate_1.Joi.string().required(),
        exame_id: celebrate_1.Joi.string().required(),
        valorexame: celebrate_1.Joi.number().required(),
        valormedico: celebrate_1.Joi.number().required(),
        valorems: celebrate_1.Joi.number().required(),
        ativo: celebrate_1.Joi.boolean().required(),
        user_id: celebrate_1.Joi.string().required(),
    },
    _b)), convenioempresaController.create);
convenioempresaRouter.put('/:id', 
//isAuthenticated,
(0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        empresa_id: celebrate_1.Joi.string().required(),
        exame_id: celebrate_1.Joi.string().required(),
        valorexame: celebrate_1.Joi.number().required(),
        valormedico: celebrate_1.Joi.number().required(),
        valorems: celebrate_1.Joi.number().required(),
        ativo: celebrate_1.Joi.boolean().required(),
        user_id: celebrate_1.Joi.string().required(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required(),
    },
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), convenioempresaController.update);
convenioempresaRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), convenioempresaController.delete);
exports.default = convenioempresaRouter;
