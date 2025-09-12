"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _MedicosRepository = require("../typeorm/repositories/MedicosRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateProfileService {
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
    email,
    ativo
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicosRepository = (0, _typeorm.getCustomRepository)(_MedicosRepository.MedicosRepository);
    const medico = await medicosRepository.findById(id);
    if (!medico) {
      throw new _AppError.default('medico not found.');
    }
    medico.nome = nome;
    medico.cpf = cpf;
    medico.rg = rg;
    medico.crm = crm;
    medico.ufcrm = ufcrm;
    medico.telefone = telefone;
    medico.datanascimento = datanascimento;
    medico.endereco = endereco;
    medico.email = email;
    medico.ativo = ativo;
    await medicosRepository.save(medico);
    return medico;
  }
}
var _default = exports.default = UpdateProfileService;