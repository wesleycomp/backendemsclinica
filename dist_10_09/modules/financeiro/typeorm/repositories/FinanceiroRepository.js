"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FinanceiroRepository = void 0;
var _typeorm = require("typeorm");
var _ExamesAso = _interopRequireDefault(require("../../../aso/typeorm/entities/ExamesAso"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let FinanceiroRepository = exports.FinanceiroRepository = (_dec = (0, _typeorm.EntityRepository)(_ExamesAso.default), _dec(_class = class FinanceiroRepository extends _typeorm.Repository {
  async findByFechamento() {
    //console.log("tess  xxxxxxxxxxxxxxxxx")
    const Fechamento = await this.find({
      where: {
        ativo: true
      },
      relations: ['aso', 'aso.empresa', 'aso.paciente']
    });
    return Fechamento;
  }

  // public async findById(id: string): Promise<Empresa | undefined> {

  //     const Fechamento = await this.findOne({
  //         where: {
  //                  id,
  //                }
  //     })
  //     return Fechamento;
  // }
}) || _class);
var _default = exports.default = FinanceiroRepository;