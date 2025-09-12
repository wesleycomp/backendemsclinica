"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _FichaClinicaController = _interopRequireDefault(require("../controllers/FichaClinicaController"));
var _PerguntaFichaClinicaController = _interopRequireDefault(require("../controllers/PerguntaFichaClinicaController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fichaClinicasRouter = (0, _express.Router)();
const fichaClinicaController = new _FichaClinicaController.default();
const perguntaFichaClinicaController = new _PerguntaFichaClinicaController.default();
fichaClinicasRouter.get('/', _isAuthenticated.default, fichaClinicaController.index);
fichaClinicasRouter.get('/perguntas/', _isAuthenticated.default, perguntaFichaClinicaController.index);
fichaClinicasRouter.get('/:aso_id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    aso_id: _celebrate.Joi.string().uuid().required()
  }
}), fichaClinicaController.show);
fichaClinicasRouter.post('/', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    aso_id: _celebrate.Joi.string().required(),
    pergunta: _celebrate.Joi.string().required(),
    resposta: _celebrate.Joi.string().allow('', null).default(''),
    observacao: _celebrate.Joi.string().allow('', null).default('')
  }
}), fichaClinicaController.create);
fichaClinicasRouter.put('/resposta/:id', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    resposta: _celebrate.Joi.string().allow('', null).default('')
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), fichaClinicaController.updateResposta);
fichaClinicasRouter.put('/observacao/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    observacao: _celebrate.Joi.string().allow('', null).default('')
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), fichaClinicaController.updateObservacao);
fichaClinicasRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), fichaClinicaController.delete);
var _default = exports.default = fichaClinicasRouter;