"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _DespesaParcelaRepository = require("../typeorm/repositories/DespesaParcelaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateDespesaParcelaService {
  async execute(data) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaParcelaRepository.DespesaParcelaRepository);
    const parcela = await repo.findOne(data.id);
    if (!parcela) throw new _AppError.default('Parcela não encontrada');
    parcela.numero = data.numero;
    parcela.vencimento = data.vencimento;
    parcela.valor = data.valor;
    parcela.status = data.status;
    parcela.data_pagamento = data.data_pagamento ?? null;
    parcela.valor_pago = data.valor_pago ?? null;
    parcela.observacao = data.observacao ?? null;
    await repo.save(parcela);
    return parcela;
  }
}
var _default = exports.default = UpdateDespesaParcelaService;