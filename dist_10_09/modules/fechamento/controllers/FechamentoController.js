"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateFechamentoService = _interopRequireDefault(require("../services/CreateFechamentoService"));
var _ListFechamentosService = _interopRequireDefault(require("../services/ListFechamentosService"));
var _UpdateFechamentoPagamentoService = _interopRequireDefault(require("../services/UpdateFechamentoPagamentoService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FechamentoController {
  async create(request, response) {
    const {
      empresa_id,
      data_inicial,
      data_final,
      criado_por,
      exameaso_ids
    } = request.body;
    const service = new _CreateFechamentoService.default();
    const fechamento = await service.execute({
      empresa_id,
      data_inicial,
      data_final,
      criado_por,
      exameaso_ids
    });
    return response.json(fechamento);
  }
  async atualizarPagamento(request, response) {
    const {
      id
    } = request.params;
    const {
      status,
      valor_pago,
      data_pagamento
    } = request.body;
    const service = new _UpdateFechamentoPagamentoService.default();
    const fechamento = await service.execute({
      fechamento_id: id,
      status,
      valor_pago,
      data_pagamento
    });
    return response.json(fechamento);
  }
  async index(req, res) {
    const {
      page,
      per_page,
      empresa_id,
      status,
      data_inicial,
      data_final
    } = req.query;
    const service = new _ListFechamentosService.default();
    const result = await service.execute({
      page: page ? Number(page) : 1,
      per_page: per_page ? Number(per_page) : 10,
      empresa_id: empresa_id ? String(empresa_id) : undefined,
      status: status ? String(status) : undefined,
      data_inicial: data_inicial ? String(data_inicial) : undefined,
      data_final: data_final ? String(data_final) : undefined
    });
    return res.json(result);
  }
}
exports.default = FechamentoController;