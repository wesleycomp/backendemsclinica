"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListReceitasPorPagamentoService = void 0;
var _tsyringe = require("tsyringe");
var _typeorm = require("typeorm");
var _dec, _dec2, _dec3, _dec4, _class;
let ListReceitasPorPagamentoService = exports.ListReceitasPorPagamentoService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("AppDataSource")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _typeorm.DataSource === "undefined" ? Object : _typeorm.DataSource]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListReceitasPorPagamentoService {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }
  async execute({
    ano,
    mes,
    dia
  }) {
    const repo = this.dataSource.getRepository("exameaso");
    const query = repo.createQueryBuilder("ea").innerJoin("aso", "a", "a.id = ea.aso_id").innerJoin("tipopagamento", "tp", "tp.id = ea.tipopagamento_id").select("tp.descricao", "tipo_pagamento").addSelect("SUM(ea.valorexame)", "total_receita").where("ea.ativo = true").andWhere("EXTRACT(YEAR FROM a.dataemissaoaso) = :ano", {
      ano
    });
    if (mes) {
      query.andWhere("EXTRACT(MONTH FROM a.dataemissaoaso) = :mes", {
        mes
      });
    }
    if (dia) {
      query.andWhere("EXTRACT(DAY FROM a.dataemissaoaso) = :dia", {
        dia
      });
    }
    const result = await query.groupBy("tp.descricao").orderBy("total_receita", "DESC").getRawMany();
    return result.map(r => ({
      tipo_pagamento: r.tipo_pagamento,
      total_receita: Number(r.total_receita)
    }));
  }
}) || _class) || _class) || _class) || _class);