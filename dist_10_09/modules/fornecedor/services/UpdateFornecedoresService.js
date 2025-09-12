"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _FornecedorRepository = require("../typeorm/repositories/FornecedorRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateFornecedorService {
  async execute({
    id,
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
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fornecedorRepository = (0, _typeorm.getCustomRepository)(_FornecedorRepository.FornecedorRepository);
    const fornecedor = await fornecedorRepository.findOne(id);
    if (!fornecedor) {
      throw new _AppError.default('Fornecedor não encontrada');
    }
    const fornecedorExists = await fornecedorRepository.findByName(nome);
    if (fornecedorExists && nome != fornecedor.nome) {
      throw new _AppError.default('Fornecedor ja existente');
    }
    fornecedor.nome = nome;
    fornecedor.cnpj = cnpj;
    fornecedor.inscricaoestadual = inscricaoestadual;
    fornecedor.inscricaomunicipal = inscricaomunicipal;
    fornecedor.endereco = endereco;
    fornecedor.telefone = telefone;
    fornecedor.email = email;
    fornecedor.responsavel = responsavel;
    fornecedor.ehlaboratorio = ehlaboratorio;
    await fornecedorRepository.save(fornecedor);
    return fornecedor;
  }
}
var _default = exports.default = UpdateFornecedorService;