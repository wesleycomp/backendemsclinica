"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ProcedimentosRepository = require("../typeorm/repositories/ProcedimentosRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowProcedimentosService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const procedimentosRepository = (0, _typeorm.getCustomRepository)(_ProcedimentosRepository.ProcedimentosRepository);
    const Procedimentos = await procedimentosRepository.findOne(id);
    if (!Procedimentos) {
      throw new _AppError.default(' Procedimento não encontrado');
    }
    return Procedimentos;
  }
}
var _default = exports.default = ShowProcedimentosService;