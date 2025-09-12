"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _PacientesRepository = require("../typeorm/repositories/PacientesRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdatePacienteService {
  async execute({
    id,
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
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const pacientesRepository = (0, _typeorm.getCustomRepository)(_PacientesRepository.PacientesRepository);
    const paciente = await pacientesRepository.findOne(id);
    if (!paciente) {
      throw new _AppError.default('Paciente não encontrado.');
    }
    console.log('passou aki');
    paciente.empresa_id = empresa_id, paciente.funcao_id = funcao_id, paciente.categoriatrabalhador_id = categoriatrabalhador_id, paciente.matricula = matricula, paciente.dataentradaempresa = dataentradaempresa, paciente.descricaoatividade = descricaoatividade, paciente.nome = nome;
    paciente.cpf = cpf;
    paciente.rg = rg;
    paciente.telefone = telefone;
    paciente.genero = genero, paciente.tiposanguineo = tiposanguineo, paciente.nacionalidade_id = nacionalidade_id, paciente.nis = nis, paciente.ctps = ctps, paciente.datanascimento = datanascimento;
    paciente.endereco = endereco;
    paciente.email = email;
    console.log('passou aki 2');
    await pacientesRepository.save(paciente);
    console.log('passou ak3');
    return paciente;
  }
}
var _default = exports.default = UpdatePacienteService;