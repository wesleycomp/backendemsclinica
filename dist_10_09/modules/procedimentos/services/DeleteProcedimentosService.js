"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ProcedimentosRepository = require("../typeorm/repositories/ProcedimentosRepository");
class DeleteProcedimentosService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const procedimentosRepository = (0, _typeorm.getCustomRepository)(_ProcedimentosRepository.ProcedimentosRepository);
    const Procedimentos = await procedimentosRepository.findOne(id);
    if (!Procedimentos) {
      throw new AppError('Função não encontrada');
    }
    await procedimentosRepository.remove(Procedimentos);
  }
}
var _default = exports.default = DeleteProcedimentosService;