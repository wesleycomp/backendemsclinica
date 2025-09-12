"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateFuncaoService = _interopRequireDefault(require("../services/CreateFuncaoService"));
var _DeleteFuncaoService = _interopRequireDefault(require("../services/DeleteFuncaoService"));
var _ListFuncaoService = _interopRequireDefault(require("../services/ListFuncaoService"));
var _ShowFuncaoService = _interopRequireDefault(require("../services/ShowFuncaoService"));
var _UpdateFuncaoService = _interopRequireDefault(require("../services/UpdateFuncaoService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FuncoesController {
  async index(request, response) {
    const listFuncoes = new _ListFuncaoService.default();
    const funcoes = await listFuncoes.execute();
    return response.json(funcoes);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showFuncoes = new _ShowFuncaoService.default();
    const funcao = await showFuncoes.execute({
      id
    });
    return response.json(funcao);
  }
  async create(request, response) {
    const {
      name,
      cbo
    } = request.body;
    const createFuncao = new _CreateFuncaoService.default();
    const funcao = await createFuncao.execute({
      name,
      cbo
    });
    return response.json(funcao);
  }
  async update(request, response) {
    const {
      name,
      cbo
    } = request.body;
    const {
      id
    } = request.params;
    const updateFuncao = new _UpdateFuncaoService.default();
    const funcao = await updateFuncao.execute({
      id,
      name,
      cbo
    });
    return response.json(funcao);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteFuncao = new _DeleteFuncaoService.default();
    await deleteFuncao.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = FuncoesController;