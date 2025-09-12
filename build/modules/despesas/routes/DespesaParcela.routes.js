"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("@shared/http/middlewares/isAuthenticated"));
var DespesaParcelaController_1 = __importDefault(require("../controllers/DespesaParcelaController"));
var router = (0, express_1.Router)();
var ctrl = new DespesaParcelaController_1.default();
// Listar todas
router.get('/', isAuthenticated_1.default, ctrl.index);
// Buscar por ID
router.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {}, _a[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() }, _a)), ctrl.show);
// Listar por despesa
router.get('/by-despesa/:despesa_id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {}, _b[celebrate_1.Segments.PARAMS] = { despesa_id: celebrate_1.Joi.string().uuid().required() }, _b)), ctrl.listByDespesa);
// Criar
router.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        despesa_id: celebrate_1.Joi.string().uuid().required(),
        fornecedor_id: celebrate_1.Joi.string().uuid().required(),
        numero: celebrate_1.Joi.number().integer().min(1).required(),
        data_emissao: celebrate_1.Joi.date().required(),
        data_vencimento: celebrate_1.Joi.date().required(),
        valor_inicial: celebrate_1.Joi.number().required(),
        status: celebrate_1.Joi.string().valid('ABERTA', 'PAGA', 'CANCELADA', 'VENCIDA').default('ABERTA'),
        observacao: celebrate_1.Joi.string().allow('', null),
    },
    _c)), ctrl.create);
// Atualizar
router.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() },
    _d[celebrate_1.Segments.BODY] = {
        numero: celebrate_1.Joi.number().integer().min(1).required(),
        fornecedor_id: celebrate_1.Joi.string().uuid().required(),
        vencimento: celebrate_1.Joi.date().required(),
        valor: celebrate_1.Joi.number().required(),
        status: celebrate_1.Joi.string().valid('ABERTA', 'PAGA', 'CANCELADA', 'VENCIDA').required(),
        data_pagamento: celebrate_1.Joi.date().allow(null),
        data_emissao: celebrate_1.Joi.date().required(),
        valor_inicial: celebrate_1.Joi.number().allow(null),
        observacao: celebrate_1.Joi.string().allow('', null),
    },
    _d)), ctrl.update);
// Excluir
router.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {}, _e[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() }, _e)), ctrl.delete);
// Quitar parcela (opcional)
router.post('/:id/pagar', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_f = {},
    _f[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() },
    _f[celebrate_1.Segments.BODY] = {
        data_pagamento: celebrate_1.Joi.date().required(),
        valor_pago: celebrate_1.Joi.number().required(),
        observacao: celebrate_1.Joi.string().allow('', null),
    },
    _f)), ctrl.pagar);
exports.default = router;
