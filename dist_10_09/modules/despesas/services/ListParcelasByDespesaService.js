"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _DespesaParcelaRepository = require("../typeorm/repositories/DespesaParcelaRepository");
class ListParcelasByDespesaService {
  async execute({
    despesa_id
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaParcelaRepository.DespesaParcelaRepository);
    return repo.listByDespesa(despesa_id);
  }
}
var _default = exports.default = ListParcelasByDespesaService;