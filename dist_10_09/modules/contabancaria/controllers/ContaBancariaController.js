"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ContaBancariaRepository = _interopRequireDefault(require("../typeorm/repositories/ContaBancariaRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/modules/contaBancaria/controllers/ContaBancariaController.ts

class ContaBancariaController {
  async index(req, res) {
    const repo = (0, _typeorm.getCustomRepository)(_ContaBancariaRepository.default);
    const contas = await repo.findAll();
    return res.json(contas);
  }
  async create(req, res) {
    const repo = (0, _typeorm.getCustomRepository)(_ContaBancariaRepository.default);
    const conta = repo.create(req.body);
    await repo.save(conta);
    return res.json(conta);
  }
  async delete(req, res) {
    const repo = (0, _typeorm.getCustomRepository)(_ContaBancariaRepository.default);
    await repo.delete(req.params.id);
    return res.status(204).send();
  }
}
exports.default = ContaBancariaController;