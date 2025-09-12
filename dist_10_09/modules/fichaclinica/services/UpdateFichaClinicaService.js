"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _FichaClinicaRepository = require("../typeorm/repositories/FichaClinicaRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateFichaClinicaService {
  async executeResposta({
    id,
    resposta
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fichaClinicaRepository = (0, _typeorm.getCustomRepository)(_FichaClinicaRepository.FichaClinicaRepository);
    const fichaClinica = await fichaClinicaRepository.findOne(id);
    if (!fichaClinica) {
      throw new _AppError.default('Ficha Clinica não encontrada');
    }
    fichaClinica.resposta = resposta;
    await fichaClinicaRepository.save(fichaClinica);
    return fichaClinica;
  }
  async executeObservacao({
    id,
    observacao
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fichaClinicaRepository = (0, _typeorm.getCustomRepository)(_FichaClinicaRepository.FichaClinicaRepository);
    const fichaClinica = await fichaClinicaRepository.findOne(id);
    if (!fichaClinica) {
      throw new _AppError.default('Ficha Clinica não encontrada');
    }
    fichaClinica.observacao = observacao;
    await fichaClinicaRepository.save(fichaClinica);
    console.log(fichaClinica);
    return fichaClinica;
  }
}
var _default = exports.default = UpdateFichaClinicaService;