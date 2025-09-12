"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _EmpresaRepository = require("../typeorm/repositories/EmpresaRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateEmpresaService {
  async execute({
    nome,
    cnpj,
    cpf,
    inscricaoestadual,
    inscricaomunicipal,
    endereco,
    telefone,
    email,
    responsavel,
    esocial,
    convenio,
    observacao
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const empresaExists = await empresaRepository.verificaCNPJ(cnpj);
    if (empresaExists) {
      throw new _AppError.default('Empresa ja existente');
    }
    const empresa = empresaRepository.create({
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao
    });
    await empresaRepository.save(empresa);
    return empresa;
  }
}
var _default = exports.default = CreateEmpresaService;