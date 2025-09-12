"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FornecedorRepository = require("../typeorm/repositories/FornecedorRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateFornecedorService {
  async execute({
    nome,
    cnpj,
    inscricaoestadual,
    inscricaomunicipal,
    endereco,
    telefone,
    email,
    responsavel,
    ehlaboratorio
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const fornecedorRepository = (0, _typeorm.getCustomRepository)(_FornecedorRepository.FornecedorRepository);
    const fornecedorExists = await fornecedorRepository.findByName(nome);
    if (fornecedorExists) {
      throw new _AppError.default('Fornecedor ja existente');
    }
    const fornecedor = fornecedorRepository.create({
      nome,
      cnpj,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      ehlaboratorio
    });
    await fornecedorRepository.save(fornecedor);
    return fornecedor;
  }
}
var _default = exports.default = CreateFornecedorService;