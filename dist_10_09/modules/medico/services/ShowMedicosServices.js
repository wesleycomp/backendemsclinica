"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _MedicosRepository = require("../typeorm/repositories/MedicosRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowMedicosService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicoRepository = (0, _typeorm.getCustomRepository)(_MedicosRepository.MedicosRepository);
    const medico = await medicoRepository.findOne(id);
    if (!medico) {
      throw new _AppError.default('medico não encontrado');
    }
    return medico;
  }
}
var _default = exports.default = ShowMedicosService;