"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _MedicoExaminadorRepository = require("../typeorm/repositories/MedicoExaminadorRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateMedicosExaminadorServices {
  async execute({
    id,
    nome,
    cpf,
    rg,
    crm,
    ufcrm,
    telefone,
    datanascimento,
    endereco,
    email
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicosRepository = (0, _typeorm.getCustomRepository)(_MedicoExaminadorRepository.MedicoExaminadorRepository);
    const medicoExaminador = await medicosRepository.findById(id);
    if (!medicoExaminador) {
      throw new _AppError.default('medico not found.');
    }
    medicoExaminador.nome = nome;
    medicoExaminador.cpf = cpf;
    medicoExaminador.rg = rg;
    medicoExaminador.crm = crm;
    medicoExaminador.ufcrm = ufcrm;
    medicoExaminador.telefone = telefone;
    medicoExaminador.datanascimento = datanascimento;
    medicoExaminador.endereco = endereco;
    medicoExaminador.email = email;
    await medicosRepository.save(medicoExaminador);
    return medicoExaminador;
  }
}
var _default = exports.default = UpdateMedicosExaminadorServices;