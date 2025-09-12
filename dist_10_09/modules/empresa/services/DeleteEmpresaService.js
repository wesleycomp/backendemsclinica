"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _EmpresaRepository = require("../typeorm/repositories/EmpresaRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteEmpresaService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const empresa = await empresaRepository.findOne(id);
    if (!empresa) {
      throw new _AppError.default('Empresa não encontrada');
    }
    await empresaRepository.remove(empresa);
  }
}
var _default = exports.default = DeleteEmpresaService;