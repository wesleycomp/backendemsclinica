"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListTipoPagamentoServices = _interopRequireDefault(require("../services/ListTipoPagamentoServices"));
var _ShowTipoPagamentoServices = _interopRequireDefault(require("../services/ShowTipoPagamentoServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TipoPagamentoController {
  async index(request, response) {
    const listTipoPagamentoes = new _ListTipoPagamentoServices.default();
    const TipoPagamentoes = await listTipoPagamentoes.execute();
    return response.json(TipoPagamentoes);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showTipoPagamentoes = new _ShowTipoPagamentoServices.default();
    const TipoPagamentoes = await showTipoPagamentoes.execute({
      id
    });
    return response.json(TipoPagamentoes);
  }
}
exports.default = TipoPagamentoController;