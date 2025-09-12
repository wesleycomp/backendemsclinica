"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _NacionalidadeRepository = require("../typeorm/repositories/NacionalidadeRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowNacionalidadeService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const nacionalidadeRepository = (0, _typeorm.getCustomRepository)(_NacionalidadeRepository.NacionaliadeRepository);
    const paciente = await nacionalidadeRepository.findOne(id);
    if (!paciente) {
      throw new _AppError.default('Nacionalidade não encontrado');
    }
    return paciente;
  }
}
var _default = exports.default = ShowNacionalidadeService;