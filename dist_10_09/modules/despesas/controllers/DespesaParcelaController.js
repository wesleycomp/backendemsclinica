"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateDespesaParcelaService = _interopRequireDefault(require("../services/CreateDespesaParcelaService"));
var _ListDespesaParcelaService = _interopRequireDefault(require("../services/ListDespesaParcelaService"));
var _ShowDespesaParcelaService = _interopRequireDefault(require("../services/ShowDespesaParcelaService"));
var _UpdateDespesaParcelaService = _interopRequireDefault(require("../services/UpdateDespesaParcelaService"));
var _DeleteDespesaParcelaService = _interopRequireDefault(require("../services/DeleteDespesaParcelaService"));
var _ListParcelasByDespesaService = _interopRequireDefault(require("../services/ListParcelasByDespesaService"));
var _PagarDespesaParcelaService = _interopRequireDefault(require("../services/PagarDespesaParcelaService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DespesaParcelaController {
  async index(req, res) {
    const svc = new _ListDespesaParcelaService.default();
    return res.json(await svc.execute());
  }
  async show(req, res) {
    const svc = new _ShowDespesaParcelaService.default();
    return res.json(await svc.execute({
      id: req.params.id
    }));
  }
  async listByDespesa(req, res) {
    const svc = new _ListParcelasByDespesaService.default();
    return res.json(await svc.execute({
      despesa_id: req.params.despesa_id
    }));
  }
  async create(req, res) {
    const svc = new _CreateDespesaParcelaService.default();
    return res.json(await svc.execute(req.body));
  }
  async update(req, res) {
    const svc = new _UpdateDespesaParcelaService.default();
    return res.json(await svc.execute({
      id: req.params.id,
      ...req.body
    }));
  }
  async delete(req, res) {
    const svc = new _DeleteDespesaParcelaService.default();
    await svc.execute({
      id: req.params.id
    });
    return res.json([]);
  }

  // opcional: “quitar” parcela
  async pagar(req, res) {
    const svc = new _PagarDespesaParcelaService.default();
    return res.json(await svc.execute({
      id: req.params.id,
      ...req.body
    }));
  }
}
exports.default = DespesaParcelaController;