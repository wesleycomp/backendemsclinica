"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _MedicoFechamentoRepository = require("../typeorm/repositories/MedicoFechamentoRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ListMedicoFechamentoServices {
  async execute({
    medico_id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fechamentoMedicoRepository = (0, _typeorm.getCustomRepository)(_MedicoFechamentoRepository.MedicoFechamentoRepository);
    const fechamentoMedico = await fechamentoMedicoRepository.findByMedicoFechamento(medico_id);
    if (!fechamentoMedico) {
      throw new _AppError.default('medico não encontrado');
    }
    return fechamentoMedico;
  }
}
var _default = exports.default = ListMedicoFechamentoServices;