"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FuncoesRepository = require("../typeorm/repositories/FuncoesRepository");
class DeleteFuncaoService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const funcoesRepository = (0, _typeorm.getCustomRepository)(_FuncoesRepository.FuncaoRepository);
    const funcao = await funcoesRepository.findOne(id);
    if (!funcao) {
      throw new AppError('Função não encontrada');
    }
    await funcoesRepository.remove(funcao);
  }
}
var _default = exports.default = DeleteFuncaoService;