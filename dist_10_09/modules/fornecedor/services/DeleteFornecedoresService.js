"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FornecedorRepository = require("../typeorm/repositories/FornecedorRepository");
class DeleteFornecedorService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fornecedorRepository = (0, _typeorm.getCustomRepository)(_FornecedorRepository.FornecedorRepository);
    const fornecedor = await fornecedorRepository.findOne(id);
    if (!fornecedor) {
      throw new AppError('Fornecedor não encontrada');
    }
    await fornecedorRepository.remove(fornecedor);
  }
}
var _default = exports.default = DeleteFornecedorService;