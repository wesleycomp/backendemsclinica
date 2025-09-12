"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateFornecedoresService = _interopRequireDefault(require("../services/CreateFornecedoresService"));
var _DeleteFornecedoresService = _interopRequireDefault(require("../services/DeleteFornecedoresService"));
var _ListFornecedoresService = _interopRequireDefault(require("../services/ListFornecedoresService"));
var _ShowFornecedoresService = _interopRequireDefault(require("../services/ShowFornecedoresService"));
var _UpdateFornecedoresService = _interopRequireDefault(require("../services/UpdateFornecedoresService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FornecedorController {
  async index(request, response) {
    const listFornecedors = new _ListFornecedoresService.default();
    const Fornecedors = await listFornecedors.execute();
    return response.json(Fornecedors);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showFornecedors = new _ShowFornecedoresService.default();
    const Fornecedor = await showFornecedors.execute({
      id
    });
    return response.json(Fornecedor);
  }
  async create(request, response) {
    const {
      nome,
      cnpj,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio
    } = request.body;
    const createFornecedor = new _CreateFornecedoresService.default();
    const Fornecedor = await createFornecedor.execute({
      nome,
      cnpj,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio
    });
    return response.json(Fornecedor);
  }
  async update(request, response) {
    const {
      nome,
      cnpj,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio
    } = request.body;
    const {
      id
    } = request.params;
    const updateFornecedor = new _UpdateFornecedoresService.default();
    const Fornecedor = await updateFornecedor.execute({
      id,
      nome,
      cnpj,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio
    });
    return response.json(Fornecedor);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteFornecedor = new _DeleteFornecedoresService.default();
    await deleteFornecedor.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = FornecedorController;