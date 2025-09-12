"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateFechamentoMedicoService = _interopRequireDefault(require("../services/CreateFechamentoMedicoService"));
var _ListMedicoFechamentoServices = _interopRequireDefault(require("../services/ListMedicoFechamentoServices"));
var _UpdateFechamentoMedicoService = _interopRequireDefault(require("../services/UpdateFechamentoMedicoService"));
var _DeleteFechamentoMedicoService = _interopRequireDefault(require("../services/DeleteFechamentoMedicoService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MedicoFechamentoController {
  async create(request, response) {
    const {
      medico_id,
      valor,
      exame_id
    } = request.body;
    const createFechamentoMedicos = new _CreateFechamentoMedicoService.default();
    const fechamentoMedicos = await createFechamentoMedicos.execute({
      medico_id,
      valor,
      exame_id
    });
    return response.json(fechamentoMedicos);
  }
  async update(request, response) {
    const {
      medico_id,
      valor,
      exame_id
    } = request.body;
    const {
      id
    } = request.params;
    const updateFechamentoMedico = new _UpdateFechamentoMedicoService.default();
    const Medicos = await updateFechamentoMedico.execute({
      id,
      medico_id,
      valor,
      exame_id
    });
    return response.json(Medicos);
  }
  async show(request, response) {
    const {
      medico_id
    } = request.params;
    const showFechamentoMedico = new _ListMedicoFechamentoServices.default();
    const fechamentoMedico = await showFechamentoMedico.execute({
      medico_id
    });
    return response.json(fechamentoMedico);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteMedicos = new _DeleteFechamentoMedicoService.default();
    await deleteMedicos.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = MedicoFechamentoController;