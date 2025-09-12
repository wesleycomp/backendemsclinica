"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ExameRepository = require("../typeorm/repositories/ExameRepository");
class DeleteExameService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const exameRepository = (0, _typeorm.getCustomRepository)(_ExameRepository.ExameRepository);
    const exame = await exameRepository.findOne(id);
    if (!exame) {
      throw new AppError('Função não encontrada');
    }
    await exameRepository.remove(exame);
  }
}
var _default = exports.default = DeleteExameService;