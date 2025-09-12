"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var MedicoExaminadorController_1 = __importDefault(require("../controllers/MedicoExaminadorController"));
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var MedicoExaminadorRouter = (0, express_1.Router)();
var medicoExaminadorController = new MedicoExaminadorController_1.default();
MedicoExaminadorRouter.get('/', isAuthenticated_1.default, medicoExaminadorController.index);
MedicoExaminadorRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _a)), medicoExaminadorController.show);
MedicoExaminadorRouter.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _b)), medicoExaminadorController.show);
MedicoExaminadorRouter.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
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
    _c)), medicoExaminadorController.create);
MedicoExaminadorRouter.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.BODY] = {
        id: celebrate_1.Joi.string().required(),
        nome: celebrate_1.Joi.string().uppercase().required(),
        cpf: celebrate_1.Joi.string().required(),
        rg: celebrate_1.Joi.string(),
        crm: celebrate_1.Joi.string().required(),
        ufcrm: celebrate_1.Joi.string().required(),
        telefone: celebrate_1.Joi.string().required(),
        datanascimento: celebrate_1.Joi.string().required(),
        endereco: celebrate_1.Joi.string(),
        email: celebrate_1.Joi.string(),
        created_at: celebrate_1.Joi.string().required(),
        updated_at: celebrate_1.Joi.string().required()
    },
    _d[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _d)), medicoExaminadorController.update);
MedicoExaminadorRouter.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {},
    _e[celebrate_1.Segments.PARAMS] = {
        id: celebrate_1.Joi.string().uuid().required(),
    },
    _e)), medicoExaminadorController.delete);
exports.default = MedicoExaminadorRouter;
