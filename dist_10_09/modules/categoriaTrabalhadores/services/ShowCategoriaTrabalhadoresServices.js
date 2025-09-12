"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _CategoriaTrabalhadorRepository = require("../typeorm/repositories/CategoriaTrabalhadorRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowCategoriaTrabalhadoresService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const categoriaTrabalhadoresRepository = (0, _typeorm.getCustomRepository)(_CategoriaTrabalhadorRepository.CategoriaTrabalhadorRepository);
    const paciente = await categoriaTrabalhadoresRepository.findOne(id);
    if (!paciente) {
      throw new _AppError.default('Categoria não encontrado');
    }
    return paciente;
  }
}
var _default = exports.default = ShowCategoriaTrabalhadoresService;