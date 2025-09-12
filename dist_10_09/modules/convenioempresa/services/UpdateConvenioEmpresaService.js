"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _ConvenioEmpresaRepository = require("../typeorm/repositories/ConvenioEmpresaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateConvenioEmpresaService {
  async execute({
    id,
    empresa_id,
    exame_id,
    valorexame,
    valorems,
    valormedico,
    ativo,
    user_id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const convenioEmpresaRepository = (0, _typeorm.getCustomRepository)(_ConvenioEmpresaRepository.ConvenioEmpresaRepository);
    const convenioEmpresa = await convenioEmpresaRepository.findById(id);
    if (!convenioEmpresa) {
      throw new _AppError.default('Convenio Empresa não encontrado');
    }
    const convenioEmpresaExists = await convenioEmpresaRepository.findByEmpresa(empresa_id);
    if (convenioEmpresaExists && empresa_id != convenioEmpresa.empresa_id && exame_id != convenioEmpresa.exame_id) {
      throw new _AppError.default('Convenio Empresa ja existente');
    }
    convenioEmpresa.empresa_id = empresa_id;
    convenioEmpresa.exame_id = exame_id;
    convenioEmpresa.valorexame = valorexame;
    convenioEmpresa.valorems = valorems;
    convenioEmpresa.valormedico = valormedico;
    convenioEmpresa.ativo = ativo;
    convenioEmpresa.user_id = user_id;
    await convenioEmpresaRepository.save(convenioEmpresa);
    return convenioEmpresa;
  }
}
var _default = exports.default = UpdateConvenioEmpresaService;