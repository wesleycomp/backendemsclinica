"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var PacientesController_1 = __importDefault(require("../controllers/PacientesController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var pacientesRouter = (0, express_1.Router)();
var pacientesController = new PacientesController_1.default();
pacientesRouter.get('/', isAuthenticated_1.default, pacientesController.index);
pacientesRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), pacientesController.show);
pacientesRouter.get('/consulta/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uppercase().required(),
    },
    _b)), pacientesController.showPacienteNome);
pacientesRouter.get('/consultacpf/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().required(),
    },
    _c)), pacientesController.showPacienteCpf);
pacientesRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.BODY] = {
        empresa_id: celebrate_1.Joi.string().required(),
        funcao_id: celebrate_1.Joi.string().required(),
        categoriatrabalhador_id: celebrate_1.Joi.string().required(),
        matricula: celebrate_1.Joi.string().allow('', null).default(''),
        dataentradaempresa: celebrate_1.Joi.string().allow('', null).default('null'),
        descricaoatividade: celebrate_1.Joi.string().allow('', null).default(''),
        nome: celebrate_1.Joi.string().uppercase().required(),
        cpf: celebrate_1.Joi.string().required(),
        rg: celebrate_1.Joi.string().required(),
        telefone: celebrate_1.Joi.string().required(),
        genero: celebrate_1.Joi.string().required(),
        tiposanguineo: celebrate_1.Joi.string().allow('', null).default(''),
        nacionalidade_id: celebrate_1.Joi.string().required(),
        nis: celebrate_1.Joi.string().allow('', null).default(''),
        ctps: celebrate_1.Joi.string().allow('', null).default(''),
        datanascimento: celebrate_1.Joi.string().required(),
        endereco: celebrate_1.Joi.string().allow('', null).default(''),
        email: celebrate_1.Joi.string().allow('', null).default(''),
    },
    _d)), pacientesController.create);
pacientesRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        empresa_id: celebrate_1.Joi.string().required(),
        funcao_id: celebrate_1.Joi.string().required(),
        categoriatrabalhador_id: celebrate_1.Joi.string().required(),
        matricula: celebrate_1.Joi.string().allow('', null).default(''),
        dataentradaempresa: celebrate_1.Joi.string().allow('', null).default('null'),
        descricaoatividade: celebrate_1.Joi.string().allow('', null).default(''),
        nome: celebrate_1.Joi.string().uppercase().required(),
        cpf: celebrate_1.Joi.string().required(),
        rg: celebrate_1.Joi.string().required(),
        telefone: celebrate_1.Joi.string().required(),
        genero: celebrate_1.Joi.string().required(),
        tiposanguineo: celebrate_1.Joi.string().allow('', null).default(''),
        nacionalidade_id: celebrate_1.Joi.string().required(),
        nis: celebrate_1.Joi.string().allow('', null).default(''),
        ctps: celebrate_1.Joi.string().allow('', null).default(''),
        datanascimento: celebrate_1.Joi.string().allow('', null).default(''),
        endereco: celebrate_1.Joi.string().allow('', null).default(''),
        email: celebrate_1.Joi.string().allow('', null).default(''),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required()
    },
    _e[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _e)), pacientesController.update);
pacientesRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_f = {},
    _f[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _f)), pacientesController.delete);
exports.default = pacientesRouter;
