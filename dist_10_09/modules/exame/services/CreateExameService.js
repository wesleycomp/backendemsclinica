"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ExameRepository = require("../typeorm/repositories/ExameRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CreateExameService {
  async execute({
    procedimento_id,
    name,
    valoravista,
    valormedico,
    valorems,
    ativo,
    usuariocadastro,
    usuarioedicao,
    localrealizacaoexame
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const exameRepository = (0, _typeorm.getCustomRepository)(_ExameRepository.ExameRepository);
    const exameExists = await exameRepository.findByName(name);
    if (exameExists) {
      throw new _AppError.default('Exame ja existente');
    }
    const exame = exameRepository.create({
      procedimento_id,
      name,
      valoravista,
      valormedico,
      valorems,
      ativo,
      usuariocadastro,
      usuarioedicao,
      localrealizacaoexame
    });
    await exameRepository.save(exame);
    return exame;
  }
}
var _default = exports.default = CreateExameService;