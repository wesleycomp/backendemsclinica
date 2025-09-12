"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MedicoFechamentoRepository = void 0;
var _typeorm = require("typeorm");
var _MedicoFechamento = _interopRequireDefault(require("../entities/MedicoFechamento"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let MedicoFechamentoRepository = exports.MedicoFechamentoRepository = (_dec = (0, _typeorm.EntityRepository)(_MedicoFechamento.default), _dec(_class = class MedicoFechamentoRepository extends _typeorm.Repository {
  async findById(id) {
    const medicofechamento = await this.findOne({
      where: {
        id
      }
    });
    return medicofechamento;
  }
  async findByMedicoFechamento(idmedico) {
    //console.log('passou aki------>'+idmedico)
    const medicofechamento = await this.find({
      where: {
        medico_id: idmedico
      },
      relations: ['medico', 'exame']
    });
    return medicofechamento;
  }
}) || _class);
var _default = exports.default = MedicoFechamentoRepository;