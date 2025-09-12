"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var EmpresaController_1 = __importDefault(require("../controllers/EmpresaController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var empresasRouter = (0, express_1.Router)();
var empresasController = new EmpresaController_1.default();
empresasRouter.get('/', isAuthenticated_1.default, empresasController.index);
empresasRouter.get('/search', isAuthenticated_1.default, empresasController.search); // 👈 novo endpoint
// 📊 listagem agrupada para fechamento (período)
empresasRouter.get('/fechamento/agrupado', isAuthenticated_1.default, empresasController.listarAgrupado);
// listar exames detalhados por empresa no período
empresasRouter.get('/:id/exames', isAuthenticated_1.default, empresasController.listarExames);
empresasRouter.get('/pesquisaempresaid/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), empresasController.showEmpresaId);
empresasRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _b)), empresasController.show);
empresasRouter.get('/consulta/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uppercase().required(),
    },
    _c)), empresasController.showEmpresaNome);
empresasRouter.get('/consultacnpj/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().required(),
    },
    _d)), empresasController.showEmpresaCnpj);
empresasRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.BODY] = {
        nome: celebrate_1.Joi.string().uppercase().required(),
        cnpj: celebrate_1.Joi.string().required(),
        cpf: celebrate_1.Joi.string().allow('', null).default(''),
        inscricaoestadual: celebrate_1.Joi.string().allow('', null).default(''),
        inscricaomunicipal: celebrate_1.Joi.string().allow('', null).default(''),
        endereco: celebrate_1.Joi.string().required(),
        telefone: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().allow('', null).default(''),
        responsavel: celebrate_1.Joi.string().allow('', null).default(''),
        esocial: celebrate_1.Joi.boolean().required(),
        convenio: celebrate_1.Joi.boolean().required(),
        observacao: celebrate_1.Joi.string().uppercase().allow('', null).default(''),
        empresafora: celebrate_1.Joi.string().required()
    },
    _e)), empresasController.create);
empresasRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_f = {},
    _f[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        nome: celebrate_1.Joi.string().uppercase().required(),
        cnpj: celebrate_1.Joi.string().required(),
        cpf: celebrate_1.Joi.string().allow('', null),
        inscricaoestadual: celebrate_1.Joi.string().allow('', null),
        inscricaomunicipal: celebrate_1.Joi.string().allow('', null),
        endereco: celebrate_1.Joi.string().required(),
        telefone: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().allow('', null).default(''),
        responsavel: celebrate_1.Joi.string().allow('', null).default(''),
        esocial: celebrate_1.Joi.boolean(),
        convenio: celebrate_1.Joi.boolean(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required(),
        observacao: celebrate_1.Joi.string().allow('', null).default(''),
        empresafora: celebrate_1.Joi.string().required()
    },
    _f[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _f)), empresasController.update);
empresasRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_g = {},
    _g[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _g)), empresasController.delete);
exports.default = empresasRouter;
