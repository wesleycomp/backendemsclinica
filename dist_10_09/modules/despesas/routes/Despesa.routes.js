"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _DespesaController = _interopRequireDefault(require("../controllers/DespesaController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = (0, _express.Router)();
const ctrl = new _DespesaController.default();
router.get('/', _isAuthenticated.default, ctrl.index);
router.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.show);

// src/modules/despesas/routes/Despesa.routes.ts
router.put('/:id/baixa', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    data_pagamento: _celebrate.Joi.date().required(),
    conta_bancaria_id: _celebrate.Joi.string().uuid().allow(null, ''),
    observacao: _celebrate.Joi.string().allow(null, ''),
    // novos campos:
    juros: _celebrate.Joi.number().default(0),
    desconto: _celebrate.Joi.number().default(0)
  }
}), ctrl.baixar.bind(ctrl));
router.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    fornecedor_id: _celebrate.Joi.string().uuid().required(),
    centro_custo_id: _celebrate.Joi.string().uuid().allow(null, ''),
    categoria_id: _celebrate.Joi.string().uuid().allow(null, ''),
    descricao: _celebrate.Joi.string().required(),
    documento: _celebrate.Joi.string().allow(null, ''),
    data_emissao: _celebrate.Joi.date().allow(null),
    data_vencimento: _celebrate.Joi.date().allow(null),
    valor_inicial: _celebrate.Joi.number().default(0),
    forma_pagamento_id: _celebrate.Joi.string().uuid().allow(null, ''),
    numero_parcelas: _celebrate.Joi.number().integer().min(1).default(1),
    status: _celebrate.Joi.string().valid('ABERTA', 'PARCIAL', 'PAGA', 'CANCELADA').default('ABERTA')
  }
}), ctrl.create);

// src/modules/despesas/routes/Despesa.routes.ts
router.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    fornecedor_id: _celebrate.Joi.string().uuid().required(),
    centro_custo_id: _celebrate.Joi.string().uuid().allow(null, ''),
    categoria_id: _celebrate.Joi.string().uuid().allow(null, ''),
    descricao: _celebrate.Joi.string().required(),
    documento: _celebrate.Joi.string().allow(null, ''),
    data_emissao: _celebrate.Joi.date().allow(null),
    data_vencimento: _celebrate.Joi.date().allow(null),
    // opcional
    valor_inicial_edit: _celebrate.Joi.number().default(0),
    // <- sem default!
    forma_pagamento_id: _celebrate.Joi.string().uuid().allow(null, ''),
    numero_parcelas: _celebrate.Joi.number().integer().min(1).optional(),
    status: _celebrate.Joi.string().valid('ABERTA', 'PARCIAL', 'PAGA', 'CANCELADA').optional()
  }
}), ctrl.update);
router.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.delete);
var _default = exports.default = router;