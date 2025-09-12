"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ProcedimentosRepository = require("../typeorm/repositories/ProcedimentosRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateProcedimentosService {
  async execute({
    name,
    codigoEsocial
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const procedimentosRepository = (0, _typeorm.getCustomRepository)(_ProcedimentosRepository.ProcedimentosRepository);
    const ProcedimentosExists = await procedimentosRepository.findByName(name);
    if (ProcedimentosExists) {
      throw new _AppError.default('Procedimentos ja existente');
    }
    const Procedimentos = procedimentosRepository.create({
      name,
      codigoEsocial
    });
    await procedimentosRepository.save(Procedimentos);
    return Procedimentos;
  }
}
var _default = exports.default = CreateProcedimentosService;