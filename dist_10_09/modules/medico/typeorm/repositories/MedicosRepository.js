"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MedicosRepository = void 0;
var _typeorm = require("typeorm");
var _Medico = _interopRequireDefault(require("../entities/Medico"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let MedicosRepository = exports.MedicosRepository = (_dec = (0, _typeorm.EntityRepository)(_Medico.default), _dec(_class = class MedicosRepository extends _typeorm.Repository {
  async findByName(name) {
    const paciente = await this.findOne({
      where: {
        name
      }
    });
    return paciente;
  }
  async findById(id) {
    const paciente = await this.findOne({
      where: {
        id
      }
    });
    return paciente;
  }
  async findByCpf(cpf) {
    const paciente = await this.findOne({
      where: {
        cpf
      }
    });
    return paciente;
  }
  async findMedicosAtivo() {
    const medico = await this.find({
      where: {
        ativo: 'true'
      }
    });
    return medico;
  }
}) || _class);
var _default = exports.default = MedicosRepository;