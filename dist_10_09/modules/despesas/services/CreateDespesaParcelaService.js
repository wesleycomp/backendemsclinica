"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _DespesaParcelaRepository = require("../typeorm/repositories/DespesaParcelaRepository");
class CreateDespesaParcelaService {
  async execute(data) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaParcelaRepository.DespesaParcelaRepository);
    const parcela = repo.create({
      despesa_id: data.despesa_id,
      numero: data.numero,
      vencimento: data.vencimento,
      valor: data.valor,
      status: data.status ?? 'ABERTA',
      observacao: data.observacao ?? null,
      data_pagamento: null,
      valor_pago: null
    });
    await repo.save(parcela);
    return parcela;
  }
}
var _default = exports.default = CreateDespesaParcelaService;