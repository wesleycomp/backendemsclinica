"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Fechamento = _interopRequireDefault(require("../typeorm/entities/Fechamento"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateFechamentoPagamentoService {
  async execute({
    fechamento_id,
    status,
    valor_pago,
    data_pagamento
  }) {
    const repo = (0, _typeorm.getRepository)(_Fechamento.default);
    const fechamento = await repo.findOne(fechamento_id);
    if (!fechamento) {
      throw new Error('Fechamento não encontrado');
    }

    // Atualiza status e valores
    fechamento.status = status;
    fechamento.valor_pago = valor_pago;
    fechamento.data_pagamento = data_pagamento ? new Date(data_pagamento) : null;
    await repo.save(fechamento);
    return fechamento;
  }
}
var _default = exports.default = UpdateFechamentoPagamentoService;