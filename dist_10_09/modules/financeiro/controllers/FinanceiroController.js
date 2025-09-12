"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListFinanceiroService = _interopRequireDefault(require("../services/ListFinanceiroService"));
var _ShowFinanceiroService = _interopRequireDefault(require("../services/ShowFinanceiroService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FinanceiroController {
  async index(request, response) {
    const listFinanceiros = new _ListFinanceiroService.default();
    const Financeiros = await listFinanceiros.execute();
    return response.json(Financeiros);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showFinanceiros = new _ShowFinanceiroService.default();
    const Fornecedor = await showFinanceiros.execute({
      id
    });
    return response.json(Fornecedor);
  }
}
exports.default = FinanceiroController;