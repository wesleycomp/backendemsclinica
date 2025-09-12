"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _MedicoFechamentoRepository = require("../typeorm/repositories/MedicoFechamentoRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DeleteFechamentoMedicosService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicoFechamentoRepository = (0, _typeorm.getCustomRepository)(_MedicoFechamentoRepository.MedicoFechamentoRepository);
    const medicoFechamento = await medicoFechamentoRepository.findOne(id);
    if (!medicoFechamento) {
      throw new _AppError.default('Item de Fechamento Medico não encontrado');
    }
    await medicoFechamentoRepository.delete(medicoFechamento);
    // return paciente;
  }
}
var _default = exports.default = DeleteFechamentoMedicosService;