"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _ExameRepository = require("../typeorm/repositories/ExameRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateExameService {
  async execute({
    id,
    procedimento_id,
    name,
    valoravista,
    valormedico,
    valorems,
    ativo,
    usuarioedicao,
    localrealizacaoexame
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const exameRepository = (0, _typeorm.getCustomRepository)(_ExameRepository.ExameRepository);
    const exame = await exameRepository.findOne(id);
    if (!exame) {
      throw new _AppError.default('Exame não encontrada');
    }
    const ExameExists = await exameRepository.findByName(name);
    if (ExameExists && name != exame.name) {
      throw new _AppError.default('Exame ja existente');
    }
    exame.name = name;
    exame.procedimento_id = procedimento_id;
    exame.valoravista = valoravista;
    exame.valormedico = valormedico;
    exame.valorems = valorems;
    exame.ativo = ativo;
    exame.usuarioedicao = usuarioedicao;
    exame.localrealizacaoexame = localrealizacaoexame;
    await exameRepository.save(exame);
    return exame;
  }
}
var _default = exports.default = UpdateExameService;