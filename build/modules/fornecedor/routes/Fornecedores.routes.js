"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var FornecedoresController_1 = __importDefault(require("../controllers/FornecedoresController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var fornecedorsRouter = (0, express_1.Router)();
var fornecedorsController = new FornecedoresController_1.default();
fornecedorsRouter.get('/', isAuthenticated_1.default, fornecedorsController.index);
fornecedorsRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), fornecedorsController.show);
fornecedorsRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.BODY] = {
        nome: celebrate_1.Joi.string().uppercase().required(),
        cnpj: celebrate_1.Joi.string().allow(null, ''),
        cpf: celebrate_1.Joi.string().allow(null, ''),
        inscricaoestadual: celebrate_1.Joi.string().allow(null, ''),
        inscricaomunicipal: celebrate_1.Joi.string().allow(null, ''),
        endereco: celebrate_1.Joi.string().allow(null, ''),
        telefone: celebrate_1.Joi.string().allow(null, ''),
        email: celebrate_1.Joi.string().email().allow(null, ''),
        responsavel: celebrate_1.Joi.string().allow(null, ''),
        esocial: celebrate_1.Joi.boolean().default(false),
        convenio: celebrate_1.Joi.boolean().default(false),
        ehlaboratorio: celebrate_1.Joi.boolean().required(),
    },
    _b)), fornecedorsController.create);
fornecedorsRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        nome: celebrate_1.Joi.string().uppercase().required(),
        cnpj: celebrate_1.Joi.string().allow(null, ''),
        cpf: celebrate_1.Joi.string().allow(null, ''),
        inscricaoestadual: celebrate_1.Joi.string().allow(null, ''),
        inscricaomunicipal: celebrate_1.Joi.string().allow(null, ''),
        endereco: celebrate_1.Joi.string().allow(null, ''),
        telefone: celebrate_1.Joi.string().allow(null, ''),
        email: celebrate_1.Joi.string().email().allow(null, ''),
        responsavel: celebrate_1.Joi.string().allow(null, ''),
        esocial: celebrate_1.Joi.boolean().default(false),
        convenio: celebrate_1.Joi.boolean().default(false),
        ehlaboratorio: celebrate_1.Joi.boolean().required(),
    },
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _c)), fornecedorsController.update);
fornecedorsRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), fornecedorsController.delete);
exports.default = fornecedorsRouter;
