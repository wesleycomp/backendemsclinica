"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _ProcedimentosRepository = require("../typeorm/repositories/ProcedimentosRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateProcedimentosService {
  async execute({
    id,
    name,
    codigoEsocial
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const procedimentosRepository = (0, _typeorm.getCustomRepository)(_ProcedimentosRepository.ProcedimentosRepository);
    const Procedimentos = await procedimentosRepository.findOne(id);
    if (!Procedimentos) {
      throw new _AppError.default('Procedimento não encontrada');
    }
    const ProcedimentosExists = await procedimentosRepository.findByName(name);
    if (ProcedimentosExists && name != Procedimentos.name) {
      throw new _AppError.default('Procedimento ja existente');
    }
    Procedimentos.name = name;
    await procedimentosRepository.save(Procedimentos);
    return Procedimentos;
  }
}
var _default = exports.default = UpdateProcedimentosService;