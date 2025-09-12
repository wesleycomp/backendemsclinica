"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _Despesa = _interopRequireDefault(require("../typeorm/entities/Despesa"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListDespesasService {
  async execute({
    page = 1,
    per_page = 10,
    descricao,
    status,
    data_inicial,
    data_final
  }) {
    const repo = (0, _typeorm.getRepository)(_Despesa.default);
    let query = repo.createQueryBuilder('despesa');

    // 🔎 filtro por descrição
    if (descricao) {
      query = query.andWhere('despesa.descricao ILIKE :descricao', {
        descricao: `%${descricao}%`
      });
    }

    // 🔎 filtro por status
    if (status) {
      query = query.andWhere('despesa.status = :status', {
        status
      });
    }

    // 🔎 filtro por período de vencimento
    if (data_inicial && data_final) {
      query = query.andWhere('despesa.data_vencimento BETWEEN :ini AND :fim', {
        ini: data_inicial,
        fim: data_final
      });
    } else if (data_inicial) {
      query = query.andWhere('despesa.data_vencimento >= :ini', {
        ini: data_inicial
      });
    } else if (data_final) {
      query = query.andWhere('despesa.data_vencimento <= :fim', {
        fim: data_final
      });
    }

    // 🔹 paginação e ordenação
    query = query.orderBy('despesa.data_vencimento', 'DESC').skip((page - 1) * per_page).take(per_page);

    // 🔹 busca e contagem em uma tacada só
    const [items, total] = await query.getManyAndCount();
    return {
      items,
      total,
      page,
      per_page
    };
  }
}
var _default = exports.default = ListDespesasService;