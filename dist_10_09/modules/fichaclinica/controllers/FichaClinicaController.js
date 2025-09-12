"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateFichaClinicaService = _interopRequireDefault(require("../services/CreateFichaClinicaService"));
var _DeleteFichaClinicaService = _interopRequireDefault(require("../services/DeleteFichaClinicaService"));
var _ListFichaClinicaService = _interopRequireDefault(require("../services/ListFichaClinicaService"));
var _ShowFichaClinicaService = _interopRequireDefault(require("../services/ShowFichaClinicaService"));
var _UpdateFichaClinicaService = _interopRequireDefault(require("../services/UpdateFichaClinicaService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FichaClinicaController {
  async index(request, response) {
    const listFichaClinica = new _ListFichaClinicaService.default();
    const fichaClinicas = await listFichaClinica.execute();
    return response.json(fichaClinicas);
  }
  async show(request, response) {
    const {
      aso_id
    } = request.params;
    const showFichaClinica = new _ShowFichaClinicaService.default();
    const fichaClinica = await showFichaClinica.execute({
      aso_id
    });
    return response.json(fichaClinica);
  }
  async create(request, response) {
    const {
      aso_id,
      pergunta,
      resposta,
      observacao
    } = request.body;
    const createFichaClinica = new _CreateFichaClinicaService.default();
    const fichaClinicas = await createFichaClinica.execute({
      aso_id,
      pergunta,
      resposta,
      observacao
    });
    return response.json(fichaClinicas);
  }
  async updateResposta(request, response) {
    const {
      resposta
    } = request.body;
    const {
      id
    } = request.params;
    const updateFichaClinica = new _UpdateFichaClinicaService.default();
    const fichaClinica = await updateFichaClinica.executeResposta({
      id,
      resposta
    });
    return response.json(fichaClinica);
  }
  async updateObservacao(request, response) {
    const {
      observacao
    } = request.body;
    const {
      id
    } = request.params;
    const updateFichaClinica = new _UpdateFichaClinicaService.default();
    const fichaClinica = await updateFichaClinica.executeObservacao({
      id,
      observacao
    });
    return response.json(fichaClinica);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteFichaClinica = new _DeleteFichaClinicaService.default();
    await deleteFichaClinica.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = FichaClinicaController;