"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateConvenioEmpresaService = _interopRequireDefault(require("../services/CreateConvenioEmpresaService"));
var _DeleteConvenioEmpresaService = _interopRequireDefault(require("../services/DeleteConvenioEmpresaService"));
var _ListConvenioEmpresaService = _interopRequireDefault(require("../services/ListConvenioEmpresaService"));
var _ShowConvenioEmpresaService = _interopRequireDefault(require("../services/ShowConvenioEmpresaService"));
var _UpdateConvenioEmpresaService = _interopRequireDefault(require("../services/UpdateConvenioEmpresaService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConvenioEmpresaController {
  async index(request, response) {
    const listConvenioEmpresa = new _ListConvenioEmpresaService.default();
    const ConvenioEmpresa = await listConvenioEmpresa.execute();
    return response.json(ConvenioEmpresa);
  }
  async show(request, response) {
    const {
      empresa_id
    } = request.params;
    const showConvenioEmpresa = new _ShowConvenioEmpresaService.default();
    const ConvenioEmpresa = await showConvenioEmpresa.execute({
      empresa_id
    });
    return response.json(ConvenioEmpresa);
  }
  async create(request, response) {
    const {
      empresa_id,
      exame_id,
      valorexame,
      valormedico,
      valorems,
      ativo,
      user_id
    } = request.body;
    const createConvenioEmpresa = new _CreateConvenioEmpresaService.default();
    const ConvenioEmpresa = await createConvenioEmpresa.execute({
      empresa_id,
      exame_id,
      valorexame,
      valormedico,
      valorems,
      ativo,
      user_id
    });
    return response.json(ConvenioEmpresa);
  }
  async update(request, response) {
    const {
      empresa_id,
      exame_id,
      valorexame,
      valormedico,
      valorems,
      ativo,
      user_id
    } = request.body;
    const {
      id
    } = request.params;
    const updateConvenioEmpresa = new _UpdateConvenioEmpresaService.default();
    const ConvenioEmpresa = await updateConvenioEmpresa.execute({
      id,
      empresa_id,
      exame_id,
      valorexame,
      valormedico,
      valorems,
      ativo,
      user_id
    });
    return response.json(ConvenioEmpresa);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteConvenioEmpresa = new _DeleteConvenioEmpresaService.default();
    await deleteConvenioEmpresa.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = ConvenioEmpresaController;