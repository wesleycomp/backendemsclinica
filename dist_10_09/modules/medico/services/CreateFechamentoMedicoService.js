"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _MedicoFechamentoRepository = require("../typeorm/repositories/MedicoFechamentoRepository");
class CreateFechamentoMedicoService {
  async execute({
    medico_id,
    valor,
    exame_id
  }) {
    const medicosFechamentoRepository = (0, _typeorm.getCustomRepository)(_MedicoFechamentoRepository.MedicoFechamentoRepository);
    const medico = medicosFechamentoRepository.create({
      medico_id,
      valor,
      exame_id
    });
    await medicosFechamentoRepository.save(medico);
    return medico;
  }
}
var _default = exports.default = CreateFechamentoMedicoService;