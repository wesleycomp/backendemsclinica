"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FuncoesRepository = require("../typeorm/repositories/FuncoesRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateFuncaoService {
  async execute({
    name,
    cbo
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const funcoesRepository = (0, _typeorm.getCustomRepository)(_FuncoesRepository.FuncaoRepository);
    const funcaoExists = await funcoesRepository.findByName(name);
    if (funcaoExists) {
      throw new _AppError.default('Funcao ja existente');
    }
    const funcao = funcoesRepository.create({
      name,
      cbo
    });
    await funcoesRepository.save(funcao);
    return funcao;
  }
}
var _default = exports.default = CreateFuncaoService;