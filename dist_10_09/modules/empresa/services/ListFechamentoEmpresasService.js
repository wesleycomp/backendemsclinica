"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Aso = _interopRequireDefault(require("../../aso/typeorm/entities/Aso"));
var _ExamesAso = _interopRequireDefault(require("../../aso/typeorm/entities/ExamesAso"));
var _Empresa = _interopRequireDefault(require("../typeorm/entities/Empresa"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListFechamentoEmpresasService {
  async execute({
    data_inicial,
    data_final,
    empresa_id
  }) {
    const asoRepo = (0, _typeorm.getRepository)(_Aso.default);
    const query = asoRepo.createQueryBuilder('a').select('a.empresa_id', 'empresa_id').addSelect('emp.nome', 'empresa_nome').addSelect('emp.cnpj', 'empresa_cnpj').addSelect('COUNT(a.id)', 'total_asos').addSelect('SUM(ex.valorexame)', 'valor_total').innerJoin(_ExamesAso.default, 'ex', 'ex.aso_id = a.id').innerJoin(_Empresa.default, 'emp', 'emp.id = a.empresa_id').where('a.ativo = true').andWhere('ex.ativo = true').andWhere('ex.tipopagamento_id = :tp', {
      tp: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a'
    }) // só convênio
    .andWhere('a.dataemissaoaso BETWEEN :inicio AND :fim', {
      inicio: data_inicial,
      fim: data_final
    });

    // 👇 filtro adicional se usuário escolheu empresa
    if (empresa_id) {
      query.andWhere('a.empresa_id = :empresa_id', {
        empresa_id
      });
    }
    query.groupBy('a.empresa_id').addGroupBy('emp.nome').addGroupBy('emp.cnpj').orderBy('emp.nome', 'ASC');
    return await query.getRawMany();
  }
}
var _default = exports.default = ListFechamentoEmpresasService;