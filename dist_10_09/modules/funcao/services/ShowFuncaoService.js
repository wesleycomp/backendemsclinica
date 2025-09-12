"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FuncoesRepository = require("../typeorm/repositories/FuncoesRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowFuncaoService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const funcoesRepository = (0, _typeorm.getCustomRepository)(_FuncoesRepository.FuncaoRepository);
    const funcao = await funcoesRepository.findOne(id);
    if (!funcao) {
      throw new _AppError.default('Função não encontrada');
    }
    return funcao;
  }
}
var _default = exports.default = ShowFuncaoService;