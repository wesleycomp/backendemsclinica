"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _PacientesRepository = require("../typeorm/repositories/PacientesRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowPacientesService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const pacienteRepository = (0, _typeorm.getCustomRepository)(_PacientesRepository.PacientesRepository);
    const paciente = await pacienteRepository.findById(id);
    if (!paciente) {
      throw new _AppError.default('Paciente não encontrado');
    }
    return paciente;
  }
  async executePacienteNome({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const pacienteRepository = (0, _typeorm.getCustomRepository)(_PacientesRepository.PacientesRepository);
    const paciente = await pacienteRepository.findByName(id);
    if (!paciente) {
      throw new _AppError.default('Paciente não encontrada');
    }
    return paciente;
  }
  async executePacienteCpf({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const pacienteRepository = (0, _typeorm.getCustomRepository)(_PacientesRepository.PacientesRepository);
    const paciente = await pacienteRepository.pesquisaByCpf(id);
    if (!paciente) {
      throw new _AppError.default('Paciente não encontrada');
    }
    return paciente;
  }
}
var _default = exports.default = ShowPacientesService;