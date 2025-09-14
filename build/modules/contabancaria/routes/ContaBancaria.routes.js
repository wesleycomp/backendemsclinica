"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
// src/modules/contaBancaria/routes/ContaBancaria.routes.ts
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("@shared/http/middlewares/isAuthenticated"));
var ContaBancariaController_1 = __importDefault(require("../controllers/ContaBancariaController"));
var router = (0, express_1.Router)();
var ctrl = new ContaBancariaController_1.default();
router.get('/', isAuthenticated_1.default, ctrl.index.bind(ctrl));
router.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        nome: celebrate_1.Joi.string().required(),
        agencia: celebrate_1.Joi.string().required(),
        numero: celebrate_1.Joi.string().required(),
        tipo: celebrate_1.Joi.string().allow(null, ''),
    },
    _a)), ctrl.create.bind(ctrl));
router.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {}, _b[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() }, _b)), ctrl.delete.bind(ctrl));
exports.default = router;
