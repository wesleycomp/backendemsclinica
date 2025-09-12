"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ConvenioEmpresaRepository = require("../typeorm/repositories/ConvenioEmpresaRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowConvenioEmpresaService {
  async execute({
    empresa_id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const convenioEmpresaRepository = (0, _typeorm.getCustomRepository)(_ConvenioEmpresaRepository.ConvenioEmpresaRepository);
    const ConvenioEmpresa = await convenioEmpresaRepository.findByEmpresa(empresa_id);
    if (!ConvenioEmpresa) {
      throw new _AppError.default('Convenio desta Empresa não encontrado');
    }
    return ConvenioEmpresa;
  }
}
var _default = exports.default = ShowConvenioEmpresaService;