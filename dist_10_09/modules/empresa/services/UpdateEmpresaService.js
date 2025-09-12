"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _EmpresaRepository = require("../typeorm/repositories/EmpresaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateEmpresaService {
  async execute({
    id,
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
    observacao,
    empresafora
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const Empresa = await empresaRepository.findOne(id);
    if (!Empresa) {
      throw new _AppError.default('Empresa não encontrada');
    }

    // const EmpresaExists= await empresaRepository.findByName(nome)

    // if(EmpresaExists && nome != Empresa.nome){

    //     throw new AppError('Empresa ja existente')
    // }

    Empresa.nome = nome;
    Empresa.cnpj = cnpj;
    Empresa.cpf = cpf;
    Empresa.inscricaoestadual = inscricaoestadual;
    Empresa.inscricaomunicipal = inscricaomunicipal;
    Empresa.endereco = endereco;
    Empresa.telefone = telefone;
    Empresa.email = email;
    Empresa.responsavel = responsavel;
    Empresa.esocial = esocial;
    Empresa.convenio = convenio;
    Empresa.observacao = observacao;
    Empresa.empresafora = empresafora;
    await empresaRepository.save(Empresa);
    return Empresa;
  }
}
var _default = exports.default = UpdateEmpresaService;