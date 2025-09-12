"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateExameService = _interopRequireDefault(require("../services/CreateExameService"));
var _DeleteExameService = _interopRequireDefault(require("../services/DeleteExameService"));
var _ListExameService = _interopRequireDefault(require("../services/ListExameService"));
var _ShowExameService = _interopRequireDefault(require("../services/ShowExameService"));
var _UpdateExameService = _interopRequireDefault(require("../services/UpdateExameService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ExameController {
  async index(request, response) {
    const listExame = new _ListExameService.default();
    const exame = await listExame.execute();
    return response.json(exame);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showExame = new _ShowExameService.default();
    const exame = await showExame.execute({
      id
    });
    return response.json(exame);
  }
  async showExamesPorLocal(request, response) {
    console.log('achou a rota');
    const showExame = new _ShowExameService.default();
    const exame = await showExame.listExamesPorLocal();
    return response.json(exame);
  }
  async create(request, response) {
    const {
      procedimento_id,
      name,
      valoravista,
      valormedico,
      valorems,
      ativo,
      usuariocadastro,
      usuarioedicao,
      localrealizacaoexame
    } = request.body;
    const createExame = new _CreateExameService.default();
    const exame = await createExame.execute({
      procedimento_id,
      name,
      valoravista,
      valormedico,
      valorems,
      ativo,
      usuariocadastro,
      usuarioedicao,
      localrealizacaoexame
    });
    return response.json(exame);
  }
  async update(request, response) {
    const {
      name,
      procedimento_id,
      valoravista,
      valormedico,
      valorems,
      ativo,
      usuarioedicao,
      localrealizacaoexame
    } = request.body;
    const {
      id
    } = request.params;
    const updateExame = new _UpdateExameService.default();
    const exame = await updateExame.execute({
      id,
      procedimento_id,
      name,
      valoravista,
      valormedico,
      valorems,
      ativo,
      usuarioedicao,
      localrealizacaoexame
    });
    return response.json(exame);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteExame = new _DeleteExameService.default();
    await deleteExame.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = ExameController;