"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _PacientesRepository = require("../typeorm/repositories/PacientesRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeletePacientesService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const pacienteRepository = (0, _typeorm.getCustomRepository)(_PacientesRepository.PacientesRepository);
    const paciente = await pacienteRepository.findOne(id);
    if (!paciente) {
      throw new _AppError.default('Paciente não encontrado');
    }
    await pacienteRepository.delete(paciente);
    // return paciente;
  }
}
var _default = exports.default = DeletePacientesService;