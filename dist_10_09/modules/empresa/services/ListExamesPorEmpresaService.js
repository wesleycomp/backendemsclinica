"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Aso = _interopRequireDefault(require("../../aso/typeorm/entities/Aso"));
var _Paciente = _interopRequireDefault(require("../../paciente/typeorm/entities/Paciente"));
var _ExamesAso = _interopRequireDefault(require("../../aso/typeorm/entities/ExamesAso"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListExamesPorEmpresaService {
  async execute({
    empresa_id,
    data_inicial,
    data_final
  }) {
    const asoRepo = (0, _typeorm.getRepository)(_Aso.default);
    const query = asoRepo.createQueryBuilder('a').select('a.id', 'aso_id').addSelect('p.nome', 'paciente').addSelect('a.resultado', 'resultado').addSelect('a.dataemissaoaso', 'dataemissaoaso').addSelect('ex.valorexame', 'valor_exame').addSelect('e.name', 'exame_nome').addSelect('ex.id', 'exameaso_id').innerJoin(_Paciente.default, 'p', 'p.id = a.paciente_id').innerJoin(_ExamesAso.default, 'ex', 'ex.aso_id = a.id').innerJoin('ex.exame', 'e').where('a.empresa_id = :empresa_id', {
      empresa_id
    }).andWhere('a.ativo = true').andWhere('ex.ativo = true').andWhere('ex.tipopagamento_id = :tp', {
      tp: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a'
    }) // 👈 só convênio
    .andWhere('a.dataemissaoaso BETWEEN :inicio AND :fim', {
      inicio: data_inicial,
      fim: data_final
    }).orderBy('a.dataemissaoaso', 'ASC');
    return await query.getRawMany();
  }
}
var _default = exports.default = ListExamesPorEmpresaService;