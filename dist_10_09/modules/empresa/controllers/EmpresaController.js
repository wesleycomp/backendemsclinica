"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateEmpresaService = _interopRequireDefault(require("../services/CreateEmpresaService"));
var _DeleteEmpresaService = _interopRequireDefault(require("../services/DeleteEmpresaService"));
var _ListEmpresaService = _interopRequireDefault(require("../services/ListEmpresaService"));
var _ShowEmpresaService = _interopRequireDefault(require("../services/ShowEmpresaService"));
var _UpdateEmpresaService = _interopRequireDefault(require("../services/UpdateEmpresaService"));
var _SearchEmpresaService = _interopRequireDefault(require("../services/SearchEmpresaService"));
var _ListFechamentoEmpresasService = _interopRequireDefault(require("../services/ListFechamentoEmpresasService"));
var _ListExamesPorEmpresaService = _interopRequireDefault(require("../services/ListExamesPorEmpresaService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EmpresaController {
  // 🔎 Pesquisa por nome/cnpj (autocomplete)
  async search(request, response) {
    const {
      search
    } = request.query;
    const searchEmpresa = new _SearchEmpresaService.default();
    const empresas = await searchEmpresa.execute({
      search: search ? String(search) : undefined
    });
    return response.json(empresas);
  }
  async listarExames(request, response) {
    const {
      id
    } = request.params;
    const {
      data_inicial,
      data_final
    } = request.query;
    const service = new _ListExamesPorEmpresaService.default();
    const exames = await service.execute({
      empresa_id: String(id),
      data_inicial: String(data_inicial),
      data_final: String(data_final)
    });
    return response.json(exames);
  }

  // 📊 Agrupamento de exames por empresa (fechamento)
  async listarAgrupado(request, response) {
    const {
      data_inicial,
      data_final,
      empresa_id
    } = request.query;
    const service = new _ListFechamentoEmpresasService.default();
    const result = await service.execute({
      data_inicial: String(data_inicial),
      data_final: String(data_final),
      empresa_id: empresa_id ? String(empresa_id) : undefined
    });
    return response.json(result);
  }

  // 📋 Lista todas as empresas (sem filtro)
  async index(request, response) {
    const listEmpresas = new _ListEmpresaService.default();
    const empresas = await listEmpresas.execute();
    return response.json(empresas);
  }

  // 🔍 Busca empresa por ID
  async show(request, response) {
    const {
      id
    } = request.params;
    const showEmpresas = new _ShowEmpresaService.default();
    const empresa = await showEmpresas.execute({
      id
    });
    return response.json(empresa);
  }

  // 🔍 Busca empresa por ID (método alternativo)
  async showEmpresaId(request, response) {
    const {
      id
    } = request.params;
    const showEmpresas = new _ShowEmpresaService.default();
    const empresa = await showEmpresas.executePesquisaEmpresaId({
      id
    });
    return response.json(empresa);
  }

  // 🔍 Busca empresa por Nome
  async showEmpresaNome(request, response) {
    const {
      id
    } = request.params;
    const showEmpresas = new _ShowEmpresaService.default();
    const empresa = await showEmpresas.executeEmpresaNome({
      id
    });
    return response.json(empresa);
  }

  // 🔍 Busca empresa por CNPJ
  async showEmpresaCnpj(request, response) {
    const {
      id
    } = request.params;
    const showEmpresas = new _ShowEmpresaService.default();
    const empresa = await showEmpresas.executeEmpresaCnpj({
      id
    });
    return response.json(empresa);
  }

  // ➕ Criação
  async create(request, response) {
    const {
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    } = request.body;
    const createEmpresa = new _CreateEmpresaService.default();
    const empresa = await createEmpresa.execute({
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    });
    return response.json(empresa);
  }

  // ✏️ Atualização
  async update(request, response) {
    const {
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    } = request.body;
    const {
      id
    } = request.params;
    const updateEmpresa = new _UpdateEmpresaService.default();
    const empresa = await updateEmpresa.execute({
      id,
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    });
    return response.json(empresa);
  }

  // 🗑️ Exclusão
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteEmpresa = new _DeleteEmpresaService.default();
    await deleteEmpresa.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = EmpresaController;