"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MedicoExaminadorRepository = void 0;
var _typeorm = require("typeorm");
var _MedicoExaminador = _interopRequireDefault(require("../../../medicoexaminador/typeorm/entities/MedicoExaminador"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let MedicoExaminadorRepository = exports.MedicoExaminadorRepository = (_dec = (0, _typeorm.EntityRepository)(_MedicoExaminador.default), _dec(_class = class MedicoExaminadorRepository extends _typeorm.Repository {
  async findByName(name) {
    const medicoexaminador = await this.findOne({
      where: {
        name
      }
    });
    return medicoexaminador;
  }
  async findById(id) {
    const medicoexaminador = await this.findOne({
      where: {
        id
      }
    });
    return medicoexaminador;
  }
  async findByCpf(cpf) {
    const medicoexaminador = await this.findOne({
      where: {
        cpf
      }
    });
    return medicoexaminador;
  }
  async ListAllOrder() {
    const medicoexaminador = await this.find({
      order: {
        ordem: "ASC"
      }
    });
    return medicoexaminador;
  }
}) || _class);
var _default = exports.default = MedicoExaminadorRepository;