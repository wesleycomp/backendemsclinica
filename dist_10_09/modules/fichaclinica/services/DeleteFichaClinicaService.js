"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FichaClinicaRepository = require("../typeorm/repositories/FichaClinicaRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteFichaClinicaService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fichaClinicaRepository = (0, _typeorm.getCustomRepository)(_FichaClinicaRepository.FichaClinicaRepository);
    const fichaClinica = await fichaClinicaRepository.findFichaClinicaAso(id);
    if (!fichaClinica) {
      throw new _AppError.default('Ficha Clinica não encontrada');
    }
    await fichaClinicaRepository.remove(fichaClinica);
  }
}
var _default = exports.default = DeleteFichaClinicaService;