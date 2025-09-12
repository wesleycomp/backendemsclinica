"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateMedicosServices = _interopRequireDefault(require("../services/CreateMedicosServices"));
var _DeleteMedicosServices = _interopRequireDefault(require("../services/DeleteMedicosServices"));
var _ListMedicosServices = _interopRequireDefault(require("../services/ListMedicosServices"));
var _ShowMedicosServices = _interopRequireDefault(require("../services/ShowMedicosServices"));
var _UpdateMedicosServices = _interopRequireDefault(require("../services/UpdateMedicosServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class MedicosController {
  async index(request, response) {
    const listMedicos = new _ListMedicosServices.default();
    const Medicos = await listMedicos.execute();
    return response.json(Medicos);
  }
  async getMedicoAtivoAll(request, response) {
    const listMedicos = new _ListMedicosServices.default();
    const Medicos = await listMedicos.listMedicoAtivos();
    return response.json(Medicos);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showMedicos = new _ShowMedicosServices.default();
    const Medicos = await showMedicos.execute({
      id
    });
    return response.json(Medicos);
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
    const createMedicos = new _CreateMedicosServices.default();
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
    // console.log('testees');

    const {
      nome,
      cpf,
      rg,
      crm,
      ufcrm,
      telefone,
      datanascimento,
      endereco,
      email,
      ativo
    } = request.body;
    const {
      id
    } = request.params;
    const updateMedicos = new _UpdateMedicosServices.default();
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
      email,
      ativo
    });
    return response.json(Medicos);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteMedicos = new _DeleteMedicosServices.default();
    await deleteMedicos.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = MedicosController;