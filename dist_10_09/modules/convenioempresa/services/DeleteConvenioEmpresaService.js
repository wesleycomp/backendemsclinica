"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ConvenioEmpresaRepository = require("../typeorm/repositories/ConvenioEmpresaRepository");
class DeleteFuncaoService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const convenioEmpresaRepository = (0, _typeorm.getCustomRepository)(_ConvenioEmpresaRepository.ConvenioEmpresaRepository);
    const funcao = await convenioEmpresaRepository.findOne(id);
    if (!funcao) {
      throw new AppError('Convenio Empresa não encontrado');
    }
    await convenioEmpresaRepository.remove(funcao);
  }
}
var _default = exports.default = DeleteFuncaoService;