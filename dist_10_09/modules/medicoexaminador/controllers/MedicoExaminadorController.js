"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ShowMedicoExaminador = _interopRequireDefault(require("../services/ShowMedicoExaminador"));
var _CreateMedicoExaminadorServices = _interopRequireDefault(require("../services/CreateMedicoExaminadorServices"));
var _DeleteMedicoExaminadorServices = _interopRequireDefault(require("../services/DeleteMedicoExaminadorServices"));
var _UpdateMedicosExaminadorServices = _interopRequireDefault(require("../services/UpdateMedicosExaminadorServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MedicoExaminadorController {
  async index(request, response) {
    const showMedicoExaminadorService = new _ShowMedicoExaminador.default();
    const Medicos = await showMedicoExaminadorService.ListAllMedicoExaminadorOrder();
    return response.json(Medicos);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showMedicoExaminadorService = new _ShowMedicoExaminador.default();
    const showMedicoExaminador = await showMedicoExaminadorService.execute({
      id
    });
    return response.json(showMedicoExaminador);
  }
  async create(request, response) {
    const {
      nome,
      cpf,
      rg,
      crm,
      ufcrm,
      telefone,
      datanascimento,
      endereco,
      email
    } = request.body;
    const createMedicos = new _CreateMedicoExaminadorServices.default();
    const Medicos = await createMedicos.execute({
      nome,
      cpf,
      rg,
      crm,
      ufcrm,
      telefone,
      datanascimento,
      endereco,
      email
    });
    return response.json(Medicos);
  }
  async update(request, response) {
    const {
      nome,
      cpf,
      rg,
      crm,
      ufcrm,
      telefone,
      datanascimento,
      endereco,
      email
    } = request.body;
    const {
      id
    } = request.params;
    const updateMedicos = new _UpdateMedicosExaminadorServices.default();
    const Medicos = await updateMedicos.execute({
      id,
      nome,
      cpf,
      rg,
      crm,
      ufcrm,
      telefone,
      datanascimento,
      endereco,
      email
    });
    return response.json(Medicos);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteMedicos = new _DeleteMedicoExaminadorServices.default();
    await deleteMedicos.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = MedicoExaminadorController;