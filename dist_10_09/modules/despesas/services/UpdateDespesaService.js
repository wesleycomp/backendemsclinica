"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _DespesaRepository = require("../typeorm/repositories/DespesaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateDespesaService {
  async execute(payload) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaRepository.DespesaRepository);
    const item = await repo.findOne(payload.id);
    if (!item) throw new _AppError.default('Despesa não encontrada');
    Object.assign(item, {
      fornecedor_id: payload.fornecedor_id,
      centro_custo_id: payload.centro_custo_id ?? null,
      categoria_id: payload.categoria_id ?? null,
      descricao: payload.descricao,
      documento: payload.documento ?? null,
      data_emissao: payload.data_emissao ?? null,
      valor_inicial: payload.valor_inicial_edit ?? 0,
      forma_pagamento: payload.forma_pagamento ?? null,
      numero_parcelas: payload.numero_parcelas ?? 1,
      status: payload.status
    });
    await repo.save(item);
    return item;
  }
}
var _default = exports.default = UpdateDespesaService;