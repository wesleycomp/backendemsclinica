"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateCategoriaDespesaService = _interopRequireDefault(require("../services/CreateCategoriaDespesaService"));
var _ListCategoriaDespesaService = _interopRequireDefault(require("../services/ListCategoriaDespesaService"));
var _ShowCategoriaDespesaService = _interopRequireDefault(require("../services/ShowCategoriaDespesaService"));
var _UpdateCategoriaDespesaService = _interopRequireDefault(require("../services/UpdateCategoriaDespesaService"));
var _DeleteCategoriaDespesaService = _interopRequireDefault(require("../services/DeleteCategoriaDespesaService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CategoriaDespesaController {
  async index(req, res) {
    const service = new _ListCategoriaDespesaService.default();
    const data = await service.execute();
    return res.json(data);
  }
  async show(req, res) {
    const {
      id
    } = req.params;
    const service = new _ShowCategoriaDespesaService.default();
    const data = await service.execute({
      id
    });
    return res.json(data);
  }
  async create(req, res) {
    const {
      nome,
      codigo,
      ativo
    } = req.body;
    const service = new _CreateCategoriaDespesaService.default();
    const data = await service.execute({
      nome,
      codigo,
      ativo
    });
    return res.json(data);
  }
  async update(req, res) {
    const {
      id
    } = req.params;
    const {
      nome,
      codigo,
      ativo
    } = req.body;
    const service = new _UpdateCategoriaDespesaService.default();
    const data = await service.execute({
      id,
      nome,
      codigo,
      ativo
    });
    return res.json(data);
  }
  async delete(req, res) {
    const {
      id
    } = req.params;
    const service = new _DeleteCategoriaDespesaService.default();
    await service.execute({
      id
    });
    return res.json([]);
  }
}
exports.default = CategoriaDespesaController;