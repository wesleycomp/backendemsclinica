"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateCentroCustoService = _interopRequireDefault(require("../services/CreateCentroCustoService"));
var _ListCentroCustoService = _interopRequireDefault(require("../services/ListCentroCustoService"));
var _ShowCentroCustoService = _interopRequireDefault(require("../services/ShowCentroCustoService"));
var _UpdateCentroCustoService = _interopRequireDefault(require("../services/UpdateCentroCustoService"));
var _DeleteCentroCustoService = _interopRequireDefault(require("../services/DeleteCentroCustoService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CentroCustoController {
  async index(req, res) {
    const svc = new _ListCentroCustoService.default();
    return res.json(await svc.execute());
  }
  async show(req, res) {
    const svc = new _ShowCentroCustoService.default();
    return res.json(await svc.execute({
      id: req.params.id
    }));
  }
  async create(req, res) {
    const svc = new _CreateCentroCustoService.default();
    return res.json(await svc.execute(req.body));
  }
  async update(req, res) {
    const svc = new _UpdateCentroCustoService.default();
    return res.json(await svc.execute({
      id: req.params.id,
      ...req.body
    }));
  }
  async delete(req, res) {
    const svc = new _DeleteCentroCustoService.default();
    await svc.execute({
      id: req.params.id
    });
    return res.json([]);
  }
}
exports.default = CentroCustoController;