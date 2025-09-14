"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var FuncoesController_1 = __importDefault(require("../controllers/FuncoesController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var funcoesRouter = (0, express_1.Router)();
var funcoesController = new FuncoesController_1.default();
funcoesRouter.get('/', isAuthenticated_1.default, funcoesController.index);
funcoesRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), funcoesController.show);
funcoesRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        name: celebrate_1.Joi.string().required(),
        cbo: celebrate_1.Joi.string().required(),
    },
    _b)), funcoesController.create);
funcoesRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        name: celebrate_1.Joi.string().required(),
        cbo: celebrate_1.Joi.string().required(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required(),
    },
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), funcoesController.update);
funcoesRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), funcoesController.delete);
exports.default = funcoesRouter;
