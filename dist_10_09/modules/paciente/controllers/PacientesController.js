"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreatePacientesServices = _interopRequireDefault(require("../services/CreatePacientesServices"));
var _DeletePacientesServices = _interopRequireDefault(require("../services/DeletePacientesServices"));
var _ListPacientesServices = _interopRequireDefault(require("../services/ListPacientesServices"));
var _ShowPacientesServices = _interopRequireDefault(require("../services/ShowPacientesServices"));
var _UpdatePacientesServices = _interopRequireDefault(require("../services/UpdatePacientesServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PacientesController {
  async index(request, response) {
    const listPacientes = new _ListPacientesServices.default();
    const pacientes = await listPacientes.execute();
    return response.json(pacientes);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showPacientes = new _ShowPacientesServices.default();
    const pacientes = await showPacientes.execute({
      id
    });
    return response.json(pacientes);
  }
  async showPacienteNome(request, response) {
    const {
      id
    } = request.params;
    const showPacientes = new _ShowPacientesServices.default();
    const paciente = await showPacientes.executePacienteNome({
      id
    });
    return response.json(paciente);
  }
  async showPacienteCpf(request, response) {
    const {
      id
    } = request.params;
    const showPacientes = new _ShowPacientesServices.default();
    const paciente = await showPacientes.executePacienteCpf({
      id
    });
    return response.json(paciente);
  }
  async create(request, response) {
    const {
      empresa_id,
      funcao_id,
      categoriatrabalhador_id,
      matricula,
      dataentradaempresa,
      descricaoatividade,
      nome,
      cpf,
      rg,
      telefone,
      datanascimento,
      endereco,
      email,
      genero,
      tiposanguineo,
      nacionalidade_id,
      nis,
      ctps
    } = request.body;
    const createPacientes = new _CreatePacientesServices.default();
    const pacientes = await createPacientes.execute({
      empresa_id,
      funcao_id,
      categoriatrabalhador_id,
      matricula,
      dataentradaempresa,
      descricaoatividade,
      nome,
      cpf,
      rg,
      telefone,
      datanascimento,
      endereco,
      email,
      genero,
      tiposanguineo,
      nacionalidade_id,
      nis,
      ctps
    });
    return response.json(pacientes);
  }
  async update(request, response) {
    const {
      empresa_id,
      funcao_id,
      categoriatrabalhador_id,
      matricula,
      dataentradaempresa,
      descricaoatividade,
      nome,
      cpf,
      rg,
      telefone,
      datanascimento,
      endereco,
      email,
      genero,
      tiposanguineo,
      nacionalidade_id,
      nis,
      ctps
    } = request.body;
    const {
      id
    } = request.params;
    const updatePacientes = new _UpdatePacientesServices.default();
    const pacientes = await updatePacientes.execute({
      id,
      empresa_id,
      funcao_id,
      categoriatrabalhador_id,
      matricula,
      dataentradaempresa,
      descricaoatividade,
      nome,
      cpf,
      rg,
      telefone,
      datanascimento,
      endereco,
      email,
      genero,
      tiposanguineo,
      nacionalidade_id,
      nis,
      ctps
    });
    return response.json(pacientes);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deletePacientes = new _DeletePacientesServices.default();
    await deletePacientes.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = PacientesController;