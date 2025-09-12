"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _CategoriaDespesaRepository = require("../typeorm/repositories/CategoriaDespesaRepository");
class ListCategoriaDespesaService {
  async execute() {
    const repo = (0, _typeorm.getCustomRepository)(_CategoriaDespesaRepository.CategoriaDespesaRepository);
    return repo.findAll();
  }
}
var _default = exports.default = ListCategoriaDespesaService;