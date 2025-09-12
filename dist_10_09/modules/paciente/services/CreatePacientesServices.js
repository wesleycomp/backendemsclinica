"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _PacientesRepository = require("../typeorm/repositories/PacientesRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreatePacientesService {
  async execute({
    empresa_id,
    funcao_id,
    categoriatrabalhador_id,
    matricula,
    dataentradaempresa,
    descricaoatividade,
    nome,
    cpf,
    rg,
    telefone,
    genero,
    tiposanguineo,
    nacionalidade_id,
    nis,
    ctps,
    datanascimento,
    endereco,
    email
  }) {
    const pacientesRepository = (0, _typeorm.getCustomRepository)(_PacientesRepository.PacientesRepository);
    const emailExists = await pacientesRepository.findByCpf(cpf);
    if (emailExists) {
      throw new _AppError.default('Paciente ja Cadastrado');
    }
    const paciente = pacientesRepository.create({
      empresa_id,
      funcao_id,
      categoriatrabalhador_id,
      matricula,
      dataentradaempresa,
      descricaoatividade,
      nome,
      cpf,
      rg,
      telefone,
      genero,
      tiposanguineo,
      nacionalidade_id,
      nis,
      ctps,
      datanascimento,
      endereco,
      email
    });
    await pacientesRepository.save(paciente);
    return paciente;
  }
}
var _default = exports.default = CreatePacientesService;