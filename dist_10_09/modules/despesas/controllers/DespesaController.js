"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateDespesaService = _interopRequireDefault(require("../services/CreateDespesaService"));
var _ListDespesaService = _interopRequireDefault(require("../services/ListDespesaService"));
var _ShowDespesaService = _interopRequireDefault(require("../services/ShowDespesaService"));
var _UpdateDespesaService = _interopRequireDefault(require("../services/UpdateDespesaService"));
var _DeleteDespesaService = _interopRequireDefault(require("../services/DeleteDespesaService"));
var _BaixarDespesaService = _interopRequireDefault(require("../services/BaixarDespesaService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// 👈 ajuste no path

class DespesaController {
  async index(req, res) {
    const {
      page,
      per_page,
      descricao,
      status,
      data_inicial,
      data_final
    } = req.query;
    const service = new _ListDespesaService.default();
    const result = await service.execute({
      page: page ? Number(page) : 1,
      per_page: per_page ? Number(per_page) : 10,
      descricao: descricao ? String(descricao) : undefined,
      status: status ? String(status) : undefined,
      data_inicial: data_inicial ? String(data_inicial) : undefined,
      data_final: data_final ? String(data_final) : undefined
    });
    return res.json(result);
  }
  async show(req, res) {
    return res.json(await new _ShowDespesaService.default().execute({
      id: req.params.id
    }));
  }
  async create(req, res) {
    return res.json(await new _CreateDespesaService.default().execute(req.body));
  }
  async update(req, res) {
    return res.json(await new _UpdateDespesaService.default().execute({
      id: req.params.id,
      ...req.body
    }));
  }
  async delete(req, res) {
    await new _DeleteDespesaService.default().execute({
      id: req.params.id
    });
    return res.json([]);
  }

  // src/modules/despesas/controllers/DespesaController.ts
  async baixar(req, res) {
    const {
      id
    } = req.params;
    const {
      data_pagamento,
      conta_bancaria_id,
      observacao,
      juros,
      desconto
    } = req.body;
    const service = new _BaixarDespesaService.default();
    const despesa = await service.execute({
      id,
      data_pagamento,
      conta_bancaria_id,
      observacao,
      juros,
      desconto
    });
    return res.json(despesa);
  }
}
exports.default = DespesaController;