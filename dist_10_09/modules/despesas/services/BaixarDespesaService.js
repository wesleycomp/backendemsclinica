"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _DespesaRepository = _interopRequireDefault(require("../typeorm/repositories/DespesaRepository"));
var _typeorm = require("typeorm");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// src/modules/despesas/services/BaixarDespesaService.ts

class BaixarDespesaService {
  async execute({
    id,
    data_pagamento,
    conta_bancaria_id,
    observacao,
    juros = 0,
    desconto = 0
  }) {
    const repo = (0, _typeorm.getCustomRepository)(_DespesaRepository.default);
    const despesa = await repo.findById(id);
    if (!despesa) throw new _AppError.default('Despesa não encontrada', 404);

    // normalizações
    const jurosNumber = Number(juros) || 0;
    const descontoNumber = Number(desconto) || 0;

    // cálculo: valor_total = valor_inicial + juros - desconto
    const inicial = Number(despesa.valor_inicial) || 0;
    const total = Number((inicial + jurosNumber - descontoNumber).toFixed(2));
    despesa.data_pagamento = data_pagamento ? new Date(data_pagamento) : null;
    despesa.conta_bancaria_id = conta_bancaria_id || null;
    despesa.observacao = observacao || null;

    // persistir campos financeiros
    despesa.juros = jurosNumber; // coluna já existe
    despesa.desconto = descontoNumber; // coluna já existe
    despesa.valor_total = total; // total calculado
    despesa.valor_pago = total; // opcional: registrar pago = total
    despesa.status = 'PAGA';
    await repo.save(despesa);
    return despesa;
  }
}
exports.default = BaixarDespesaService;