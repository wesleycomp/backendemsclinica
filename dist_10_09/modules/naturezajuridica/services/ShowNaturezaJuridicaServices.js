"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _NaturezaJuridicaRepository = require("../typeorm/repositories/NaturezaJuridicaRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowNaturezaJuridicaService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const NaturezaJuridicaRepository = (0, _typeorm.getCustomRepository)(_NaturezaJuridicaRepository.NacionaliadeRepository);
    const paciente = await NaturezaJuridicaRepository.findOne(id);
    if (!paciente) {
      throw new _AppError.default('Natureza Juridica não encontrado');
    }
    return paciente;
  }
}
var _default = exports.default = ShowNaturezaJuridicaService;