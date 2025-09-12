"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _FuncoesRepository = require("../typeorm/repositories/FuncoesRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateFuncaoService {
  async execute({
    id,
    name,
    cbo
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const funcoesRepository = (0, _typeorm.getCustomRepository)(_FuncoesRepository.FuncaoRepository);
    const funcao = await funcoesRepository.findOne(id);
    if (!funcao) {
      throw new _AppError.default('Função não encontrada');
    }
    const funcaoExists = await funcoesRepository.findByName(name);
    if (funcaoExists && name != funcao.name) {
      throw new _AppError.default('Funcao ja existente');
    }
    funcao.name = name;
    funcao.cbo = cbo;
    await funcoesRepository.save(funcao);
    return funcao;
  }
}
var _default = exports.default = UpdateFuncaoService;