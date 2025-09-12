"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ExameAsoController = _interopRequireDefault(require("../controllers/ExameAsoController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const ExameAsoRouter = (0, _express.Router)();
const exameAsoController = new _ExameAsoController.default();
ExameAsoRouter.get('/historico/exameasoexcluida', _isAuthenticated.default, exameAsoController.showExameAsoExcluidas);
ExameAsoRouter.get('/:aso_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    aso_id: _celebrate.Joi.string().uuid().required()
  }
}), exameAsoController.show);
ExameAsoRouter.get('/listexames/:datainicio/:datafim/:tipopagamento/:usuario/:empresa/:empresafora', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    datainicio: _celebrate.Joi.string().required(),
    datafim: _celebrate.Joi.string().required(),
    tipopagamento: _celebrate.Joi.string(),
    usuario: _celebrate.Joi.string(),
    empresa: _celebrate.Joi.string(),
    empresafora: _celebrate.Joi.string()
  }
}), exameAsoController.showExamesPeriodo);
ExameAsoRouter.get(
// '/relatoriofechamamento/:datainicio/:datafim/:tipopagamento/:usuario/:empresa/:empresafora',
'/relatoriofechamamento/:datainicio/:datafim/:empresa/:tipopagamento/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    datainicio: _celebrate.Joi.string().required(),
    datafim: _celebrate.Joi.string().required(),
    empresa: _celebrate.Joi.string(),
    tipopagamento: _celebrate.Joi.string()
  }
}), exameAsoController.showRelatorioFechamentoEmpresa);
ExameAsoRouter.get('/valores/:aso_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    aso_id: _celebrate.Joi.string().uuid().required()
  }
}), exameAsoController.showAsoValores);
ExameAsoRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    aso_id: _celebrate.Joi.string().required(),
    exame_id: _celebrate.Joi.string().required(),
    valorexame: _celebrate.Joi.number().required(),
    valormedico: _celebrate.Joi.number().required(),
    valorems: _celebrate.Joi.number().required(),
    ativo: _celebrate.Joi.boolean().allow('', null).default('true'),
    tipopagamento_id: _celebrate.Joi.string().required(),
    user_id: _celebrate.Joi.string().required()
  }
}), exameAsoController.create);
ExameAsoRouter.put('/desconto/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    desconto: _celebrate.Joi.boolean().required(),
    valorexamesemdesconto: _celebrate.Joi.number().required(),
    user_desconto: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  }
}), exameAsoController.update);
ExameAsoRouter.delete('/:id/:usuario_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required(),
    usuario_id: _celebrate.Joi.string().uuid().required()
  }
}), exameAsoController.delete);
ExameAsoRouter.get('/fechamentomedico/examesrealizados/:datainicio/:datafim/:medico_id/:exame_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    datainicio: _celebrate.Joi.string().required(),
    datafim: _celebrate.Joi.string().required(),
    medico_id: _celebrate.Joi.string().uuid().required(),
    exame_id: _celebrate.Joi.string()
  }
}), exameAsoController.showFechamentoMedicoExames);
ExameAsoRouter.get('/listexames/:datainicio/:datafim/:idexame', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    datainicio: _celebrate.Joi.string().required(),
    datafim: _celebrate.Joi.string().required(),
    idexame: _celebrate.Joi.string().required()
  }
}), exameAsoController.showExamesPeriodConsolidado);
var _default = exports.default = ExameAsoRouter;