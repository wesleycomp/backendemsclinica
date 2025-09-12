"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _MedicosRepository = require("../typeorm/repositories/MedicosRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateMedicosService {
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
    const medicosRepository = (0, _typeorm.getCustomRepository)(_MedicosRepository.MedicosRepository);
    const emailExists = await medicosRepository.findByCpf(cpf);
    if (emailExists) {
      throw new _AppError.default('Medico ja Cadastrado');
    }
    const medico = medicosRepository.create({
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
    await medicosRepository.save(medico);
    return medico;
  }
}
var _default = exports.default = CreateMedicosService;