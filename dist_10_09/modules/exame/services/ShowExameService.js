"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ExameRepository = require("../typeorm/repositories/ExameRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowFuncaoService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const exameRepository = (0, _typeorm.getCustomRepository)(_ExameRepository.ExameRepository);
    const exame = await exameRepository.findById(id);
    if (!exame) {
      throw new _AppError.default('Exame não encontrado');
    }
    return exame;
  }
  async listExamesPorLocal() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const exameRepository = (0, _typeorm.getCustomRepository)(_ExameRepository.ExameRepository);
    const exame = await exameRepository.findExamesPorLocal();
    if (!exame) {
      throw new _AppError.default('Exame não encontrado');
    }
    return exame;
  }
}
var _default = exports.default = ShowFuncaoService;