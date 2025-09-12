"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ConvenioEmpresaRepository = require("../typeorm/repositories/ConvenioEmpresaRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateConvenioEmpresaService {
  async execute({
    empresa_id,
    exame_id,
    valorexame,
    valorems,
    valormedico,
    ativo,
    user_id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const convenioempresaRepository = (0, _typeorm.getCustomRepository)(_ConvenioEmpresaRepository.ConvenioEmpresaRepository);
    const ConvenioEmpresaExists = await convenioempresaRepository.findByConvenioEmpresa(empresa_id, exame_id);
    if (ConvenioEmpresaExists) {
      throw new _AppError.default(' Ja existe esse exame no Convenio Empresa ');
    }
    const ConvenioEmpresa = convenioempresaRepository.create({
      empresa_id,
      exame_id,
      valorexame,
      valorems,
      valormedico,
      ativo,
      user_id
    });
    await convenioempresaRepository.save(ConvenioEmpresa);
    return ConvenioEmpresa;
  }
}
var _default = exports.default = CreateConvenioEmpresaService;