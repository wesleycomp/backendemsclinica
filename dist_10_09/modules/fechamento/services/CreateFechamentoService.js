"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Fechamento = _interopRequireDefault(require("../typeorm/entities/Fechamento"));
var _FechamentoAso = _interopRequireDefault(require("../typeorm/entities/FechamentoAso"));
var _ExamesAso = _interopRequireDefault(require("../../aso/typeorm/entities/ExamesAso"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateFechamentoService {
  async execute({
    empresa_id,
    data_inicial,
    data_final,
    criado_por,
    exameaso_ids
  }) {
    const fechamentoRepo = (0, _typeorm.getRepository)(_Fechamento.default);
    const fechamentoAsoRepo = (0, _typeorm.getRepository)(_FechamentoAso.default);
    const exameAsoRepo = (0, _typeorm.getRepository)(_ExamesAso.default);

    // 🔎 Buscar exames ativos selecionados e tipo pagamento convenio
    const exames = await exameAsoRepo.find({
      where: {
        id: (0, _typeorm.In)(exameaso_ids),
        ativo: true,
        tipopagamento_id: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a'
      },
      relations: ['aso']
    });
    if (!exames.length) {
      throw new Error('Nenhum exame válido encontrado para cobrança');
    }

    // 💰 Calcular valor total
    const valor_total = exames.reduce((acc, ex) => acc + Number(ex.valorexame || 0), 0);

    // 📝 Criar cabeçalho do fechamento
    const fechamento = fechamentoRepo.create({
      empresa_id,
      data_inicial,
      data_final,
      criado_por,
      valor_total,
      status: 'aberto',
      valor_pago: 0,
      data_pagamento: null
    });
    await fechamentoRepo.save(fechamento);

    // 🔗 Vincular ASOs ao fechamento
    const itens = exames.map(ex => {
      return fechamentoAsoRepo.create({
        fechamento_id: fechamento.id,
        aso_id: ex.aso_id,
        valor: ex.valorexame
      });
    });
    await fechamentoAsoRepo.save(itens);

    // ❌ Atualizar exames para inativos
    await exameAsoRepo.update({
      id: (0, _typeorm.In)(exameaso_ids)
    }, {
      ativo: false
    });

    // carregar asos vinculados
    fechamento.asos = itens;
    return fechamento;
  }
}
var _default = exports.default = CreateFechamentoService;