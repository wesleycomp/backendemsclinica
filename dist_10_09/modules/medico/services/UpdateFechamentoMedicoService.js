"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
var _typeorm = require("typeorm");
var _MedicoFechamentoRepository = require("../typeorm/repositories/MedicoFechamentoRepository");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class UpdateFechamentoMedicoService {
  async execute({
    id,
    medico_id,
    valor,
    exame_id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fechamentoMedicoRepository = (0, _typeorm.getCustomRepository)(_MedicoFechamentoRepository.MedicoFechamentoRepository);
    const fechamentoMedico = await fechamentoMedicoRepository.findById(id);
    if (!fechamentoMedico) {
      throw new _AppError.default('medico not found.');
    }
    fechamentoMedico.medico_id = medico_id;
    fechamentoMedico.valor = valor;
    fechamentoMedico.exame_id = exame_id;
    await fechamentoMedicoRepository.save(fechamentoMedico);
    return fechamentoMedico;
  }
}
var _default = exports.default = UpdateFechamentoMedicoService;