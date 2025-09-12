"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _DespesaParcelaRepository = require("../typeorm/repositories/DespesaParcelaRepository");
class ListDespesaParcelaService {
  async execute() {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaParcelaRepository.DespesaParcelaRepository);
    return repo.find({
      order: {
        created_at: 'DESC'
      }
    });
  }
}
var _default = exports.default = ListDespesaParcelaService;