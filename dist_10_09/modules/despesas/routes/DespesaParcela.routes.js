"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
var _DespesaParcelaController = _interopRequireDefault(require("../controllers/DespesaParcelaController"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = (0, _express.Router)();
const ctrl = new _DespesaParcelaController.default();

// Listar todas
router.get('/', _isAuthenticated.default, ctrl.index);

// Buscar por ID
router.get('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.show);

// Listar por despesa
router.get('/by-despesa/:despesa_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    despesa_id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.listByDespesa);

// Criar
router.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    despesa_id: _celebrate.Joi.string().uuid().required(),
    fornecedor_id: _celebrate.Joi.string().uuid().required(),
    numero: _celebrate.Joi.number().integer().min(1).required(),
    data_emissao: _celebrate.Joi.date().required(),
    data_vencimento: _celebrate.Joi.date().required(),
    valor_inicial: _celebrate.Joi.number().required(),
    status: _celebrate.Joi.string().valid('ABERTA', 'PAGA', 'CANCELADA', 'VENCIDA').default('ABERTA'),
    observacao: _celebrate.Joi.string().allow('', null)
  }
}), ctrl.create);

// Atualizar
router.put('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    numero: _celebrate.Joi.number().integer().min(1).required(),
    fornecedor_id: _celebrate.Joi.string().uuid().required(),
    vencimento: _celebrate.Joi.date().required(),
    valor: _celebrate.Joi.number().required(),
    status: _celebrate.Joi.string().valid('ABERTA', 'PAGA', 'CANCELADA', 'VENCIDA').required(),
    data_pagamento: _celebrate.Joi.date().allow(null),
    data_emissao: _celebrate.Joi.date().required(),
    valor_inicial: _celebrate.Joi.number().allow(null),
    observacao: _celebrate.Joi.string().allow('', null)
  }
}), ctrl.update);

// Excluir
router.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), ctrl.delete);

// Quitar parcela (opcional)
router.post('/:id/pagar', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  },
  [_celebrate.Segments.BODY]: {
    data_pagamento: _celebrate.Joi.date().required(),
    valor_pago: _celebrate.Joi.number().required(),
    observacao: _celebrate.Joi.string().allow('', null)
  }
}), ctrl.pagar);
var _default = exports.default = router;