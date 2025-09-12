"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _DespesaRepository = require("../typeorm/repositories/DespesaRepository");
class CreateDespesaService {
  async execute(data) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaRepository.DespesaRepository);
    const despesa = repo.create({
      fornecedor_id: data.fornecedor_id,
      centro_custo_id: data.centro_custo_id ?? null,
      categoria_id: data.categoria_id ?? null,
      descricao: data.descricao,
      documento: data.documento ?? null,
      data_emissao: data.data_emissao ?? null,
      data_vencimento: data.data_vencimento ?? null,
      valor_inicial: data.valor_inicial ?? 0,
      forma_pagamento_id: data.forma_pagamento_id ?? null,
      numero_parcelas: data.numero_parcelas ?? 1,
      status: data.status ?? 'ABERTA'
    });
    await repo.save(despesa);
    return despesa;
  }
}
var _default = exports.default = CreateDespesaService;