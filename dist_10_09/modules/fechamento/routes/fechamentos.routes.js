"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _FechamentoController = _interopRequireDefault(require("../controllers/FechamentoController"));
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middlewares/isAuthenticated"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const fechamentosRouter = (0, _express.Router)();
const controller = new _FechamentoController.default();
fechamentosRouter.post('/', _isAuthenticated.default, controller.create);
fechamentosRouter.get('/', _isAuthenticated.default, controller.index);

// atualizar pagamento (recebimento)
fechamentosRouter.put('/:id/pagamento', _isAuthenticated.default, controller.atualizarPagamento);
var _default = exports.default = fechamentosRouter;