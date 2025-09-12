"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("@shared/http/middlewares/isAuthenticated"));
var CategoriaDespesaController_1 = __importDefault(require("../controllers/CategoriaDespesaController"));
var categoriaDespesaRouter = (0, express_1.Router)();
var controller = new CategoriaDespesaController_1.default();
// 📌 Listar todas
categoriaDespesaRouter.get('/', isAuthenticated_1.default, controller.index);
// 📌 Buscar por ID
categoriaDespesaRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), controller.show);
// 📌 Criar
categoriaDespesaRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        nome: celebrate_1.Joi.string().trim().required(),
        codigo: celebrate_1.Joi.string().allow(null, ''),
        ativo: celebrate_1.Joi.boolean().default(true),
    },
    _b)), controller.create);
// 📌 Atualizar
categoriaDespesaRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c[celebrate_1.Segments.BODY] = {
        nome: celebrate_1.Joi.string().trim().required(),
        codigo: celebrate_1.Joi.string().allow(null, ''),
        ativo: celebrate_1.Joi.boolean().required(),
    },
    _c)), controller.update);
// 📌 Deletar
categoriaDespesaRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), controller.delete);
exports.default = categoriaDespesaRouter;
