"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _EmpresaRepository = require("../typeorm/repositories/EmpresaRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowEmpresaService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const empresa = await empresaRepository.verificaCNPJ(id);
    if (!empresa) {
      throw new _AppError.default('Empresa não encontrada');
    }
    return empresa;
  }
  async executePesquisaEmpresaId({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const empresa = await empresaRepository.pesquisaEmpresaPorID(id);
    if (!empresa) {
      throw new _AppError.default('Empresa não encontrada');
    }
    return empresa;
  }
  async executeEmpresaNome({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const empresa = await empresaRepository.findByName(id);
    if (!empresa) {
      throw new _AppError.default('Empresa não encontrada');
    }
    return empresa;
  }
  async executeEmpresaCnpj({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const empresa = await empresaRepository.findByCnpj(id);
    if (!empresa) {
      throw new _AppError.default('Empresa não encontrada');
    }
    return empresa;
  }
}
var _default = exports.default = ShowEmpresaService;