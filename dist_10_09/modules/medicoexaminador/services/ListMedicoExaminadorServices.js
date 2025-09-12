"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _MedicoExaminadorRepository = _interopRequireDefault(require("../typeorm/repositories/MedicoExaminadorRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListMedicoExaminadorServices {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicoExaminadorRepository = (0, _typeorm.getCustomRepository)(_MedicoExaminadorRepository.default);
    const MedicoExaminador = await medicoExaminadorRepository.find();
    return MedicoExaminador;
  }
}
var _default = exports.default = ListMedicoExaminadorServices;