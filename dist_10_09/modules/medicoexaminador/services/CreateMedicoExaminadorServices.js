"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _MedicoExaminadorRepository = require("../typeorm/repositories/MedicoExaminadorRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateMedicoExaminadorServices {
  async execute({
    nome,
    cpf,
    rg,
    crm,
    ufcrm,
    telefone,
    datanascimento,
    email,
    endereco
  }) {
    const medicoExaminadorRepository = (0, _typeorm.getCustomRepository)(_MedicoExaminadorRepository.MedicoExaminadorRepository);
    const medicoExaminadorExists = await medicoExaminadorRepository.findByCpf(cpf);
    if (medicoExaminadorExists) {
      throw new _AppError.default('Medico examinador ja Cadastrado');
    }
    const medicoExaminador = medicoExaminadorRepository.create({
      nome,
      cpf,
      rg,
      crm,
      ufcrm,
      telefone,
      datanascimento,
      endereco,
      email
    });
    await medicoExaminadorRepository.save(medicoExaminador);
    return medicoExaminador;
  }
}
var _default = exports.default = CreateMedicoExaminadorServices;