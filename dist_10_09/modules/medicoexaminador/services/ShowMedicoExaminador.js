"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _MedicoExaminadorRepository = require("../typeorm/repositories/MedicoExaminadorRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowExaminadorService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicoExaminadorRepository = (0, _typeorm.getCustomRepository)(_MedicoExaminadorRepository.MedicoExaminadorRepository);
    const medicoExaminador = await medicoExaminadorRepository.findOne(id);
    if (!medicoExaminador) {
      throw new _AppError.default('medico examinador não encontrado');
    }
    return medicoExaminador;
  }
  async ListMedicoExaminador() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicoExaminadorRepository = (0, _typeorm.getCustomRepository)(_MedicoExaminadorRepository.MedicoExaminadorRepository);
    const medicoExaminador = await medicoExaminadorRepository.find();
    return medicoExaminador;
  }
  async ListAllMedicoExaminadorOrder() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicoExaminadorRepository = (0, _typeorm.getCustomRepository)(_MedicoExaminadorRepository.MedicoExaminadorRepository);
    const medicoExaminador = await medicoExaminadorRepository.ListAllOrder();
    return medicoExaminador;
  }
}
var _default = exports.default = ShowExaminadorService;