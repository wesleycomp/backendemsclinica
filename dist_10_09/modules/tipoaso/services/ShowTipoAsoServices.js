"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _TipoAsoRepository = require("../typeorm/repositories/TipoAsoRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowtipoAsosService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const tipoAsosRepository = (0, _typeorm.getCustomRepository)(_TipoAsoRepository.TipoAsoRepository);
    const paciente = await tipoAsosRepository.findOne(id);
    if (!paciente) {
      throw new _AppError.default('Tipo Aso não encontrado');
    }
    return paciente;
  }
}
var _default = exports.default = ShowtipoAsosService;