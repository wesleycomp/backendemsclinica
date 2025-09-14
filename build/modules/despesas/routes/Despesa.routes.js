"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var isAuthenticated_1 = __importDefault(require("@shared/http/middlewares/isAuthenticated"));
var DespesaController_1 = __importDefault(require("../controllers/DespesaController"));
var router = (0, express_1.Router)();
var ctrl = new DespesaController_1.default();
router.get('/', isAuthenticated_1.default, ctrl.index);
router.get('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_a = {}, _a[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() }, _a)), ctrl.show);
// src/modules/despesas/routes/Despesa.routes.ts
router.put('/:id/baixa', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_b = {},
    _b[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() },
    _b[celebrate_1.Segments.BODY] = {
        data_pagamento: celebrate_1.Joi.date().required(),
        conta_bancaria_id: celebrate_1.Joi.string().uuid().allow(null, ''),
        observacao: celebrate_1.Joi.string().allow(null, ''),
        // novos campos:
        juros: celebrate_1.Joi.number().default(0),
        desconto: celebrate_1.Joi.number().default(0),
    },
    _b)), ctrl.baixar.bind(ctrl));
router.post('/', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_c = {},
    _c[celebrate_1.Segments.BODY] = {
        fornecedor_id: celebrate_1.Joi.string().uuid().required(),
        centro_custo_id: celebrate_1.Joi.string().uuid().allow(null, ''),
        categoria_id: celebrate_1.Joi.string().uuid().allow(null, ''),
        descricao: celebrate_1.Joi.string().required(),
        documento: celebrate_1.Joi.string().allow(null, ''),
        data_emissao: celebrate_1.Joi.date().allow(null),
        data_vencimento: celebrate_1.Joi.date().allow(null),
        valor_inicial: celebrate_1.Joi.number().default(0),
        forma_pagamento_id: celebrate_1.Joi.string().uuid().allow(null, ''),
        numero_parcelas: celebrate_1.Joi.number().integer().min(1).default(1),
        status: celebrate_1.Joi.string().valid('ABERTA', 'PARCIAL', 'PAGA', 'CANCELADA').default('ABERTA'),
    },
    _c)), ctrl.create);
// src/modules/despesas/routes/Despesa.routes.ts
router.put('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_d = {},
    _d[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() },
    _d[celebrate_1.Segments.BODY] = {
        fornecedor_id: celebrate_1.Joi.string().uuid().required(),
        centro_custo_id: celebrate_1.Joi.string().uuid().allow(null, ''),
        categoria_id: celebrate_1.Joi.string().uuid().allow(null, ''),
        descricao: celebrate_1.Joi.string().required(),
        documento: celebrate_1.Joi.string().allow(null, ''),
        data_emissao: celebrate_1.Joi.date().allow(null),
        data_vencimento: celebrate_1.Joi.date().allow(null),
        valor_inicial_edit: celebrate_1.Joi.number().default(0),
        forma_pagamento_id: celebrate_1.Joi.string().uuid().allow(null, ''),
        numero_parcelas: celebrate_1.Joi.number().integer().min(1).optional(),
        status: celebrate_1.Joi.string().valid('ABERTA', 'PARCIAL', 'PAGA', 'CANCELADA').optional(),
    },
    _d)), ctrl.update);
router.delete('/:id', isAuthenticated_1.default, (0, celebrate_1.celebrate)((_e = {}, _e[celebrate_1.Segments.PARAMS] = { id: celebrate_1.Joi.string().uuid().required() }, _e)), ctrl.delete);
exports.default = router;
