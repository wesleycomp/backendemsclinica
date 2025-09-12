"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _ConvenioEmpresaController = _interopRequireDefault(require("../controllers/ConvenioEmpresaController"));
var _celebrate = require("celebrate");
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const convenioempresaRouter = (0, _express.Router)();
const convenioempresaController = new _ConvenioEmpresaController.default();

//convenioempresaRouter.get('/',  convenioempresaController.index)

convenioempresaRouter.get('/:empresa_id',
// isAuthenticated,
(0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    empresa_id: _celebrate.Joi.string().uuid().required()
  }
}), convenioempresaController.show);
convenioempresaRouter.post('/',
// isAuthenticated,
(0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    empresa_id: _celebrate.Joi.string().required(),
    exame_id: _celebrate.Joi.string().required(),
    valorexame: _celebrate.Joi.number().required(),
    valormedico: _celebrate.Joi.number().required(),
    valorems: _celebrate.Joi.number().required(),
    ativo: _celebrate.Joi.boolean().required(),
    user_id: _celebrate.Joi.string().required()
  }
}), convenioempresaController.create);
convenioempresaRouter.put('/:id',
//isAuthenticated,
(0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    id: _celebrate.Joi.string().required(),
    empresa_id: _celebrate.Joi.string().required(),
    exame_id: _celebrate.Joi.string().required(),
    valorexame: _celebrate.Joi.number().required(),
    valormedico: _celebrate.Joi.number().required(),
    valorems: _celebrate.Joi.number().required(),
    ativo: _celebrate.Joi.boolean().required(),
    user_id: _celebrate.Joi.string().required(),
    created_at: _celebrate.Joi.string().required(),
    updated_at: _celebrate.Joi.string().required()
  },
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), convenioempresaController.update);
convenioempresaRouter.delete('/:id', _isAuthenticated.default, (0, _celebrate.celebrate)({
  [_celebrate.Segments.PARAMS]: {
    id: _celebrate.Joi.string().uuid().required()
  }
}), convenioempresaController.delete);
var _default = exports.default = convenioempresaRouter;