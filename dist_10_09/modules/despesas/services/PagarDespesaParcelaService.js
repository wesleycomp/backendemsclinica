"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _DespesaParcelaRepository = require("../typeorm/repositories/DespesaParcelaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PagarDespesaParcelaService {
  async execute({
    id,
    data_pagamento,
    valor_pago,
    observacao
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaParcelaRepository.DespesaParcelaRepository);
    const parcela = await repo.findOne(id);
    if (!parcela) throw new _AppError.default('Parcela não encontrada');
    parcela.status = 'PAGA';
    parcela.data_pagamento = data_pagamento;
    parcela.valor_pago = valor_pago;
    parcela.observacao = observacao ?? parcela.observacao;
    await repo.save(parcela);
    return parcela;
  }
}
var _default = exports.default = PagarDespesaParcelaService;