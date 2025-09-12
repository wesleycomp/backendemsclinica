"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _DespesaRepository = require("../typeorm/repositories/DespesaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/modules/despesas/services/ShowDespesaService.ts

class ShowDespesaService {
  async execute({
    id
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaRepository.DespesaRepository);
    const despesa = await repo.findOne(id, {
      relations: ['fornecedor', 'centro_custo', 'categoria', 'forma_pagamento', 'conta_bancaria']
    });
    if (!despesa) {
      throw new _AppError.default('Despesa não encontrada.');
    }
    return despesa;
  }
}
var _default = exports.default = ShowDespesaService;