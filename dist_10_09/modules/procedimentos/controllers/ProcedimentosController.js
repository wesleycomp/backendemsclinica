"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _CreateEspecialidadeMedicaService = _interopRequireDefault(require("../services/CreateEspecialidadeMedicaService"));
var _DeleteProcedimentosService = _interopRequireDefault(require("../services/DeleteProcedimentosService"));
var _ListProcedimentosService = _interopRequireDefault(require("../services/ListProcedimentosService"));
var _ShowProcedimentosService = _interopRequireDefault(require("../services/ShowProcedimentosService"));
var _UpdateProcedimentosService = _interopRequireDefault(require("../services/UpdateProcedimentosService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class EspecialidadeMedicasController {
  async index(request, response) {
    const listEspecialidadeMedicas = new _ListProcedimentosService.default();
    const especialidadeMedicas = await listEspecialidadeMedicas.execute();
    return response.json(especialidadeMedicas);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showEspecialidadeMedicas = new _ShowProcedimentosService.default();
    const EspecialidadeMedica = await showEspecialidadeMedicas.execute({
      id
    });
    return response.json(EspecialidadeMedica);
  }
  async create(request, response) {
    const {
      name
    } = request.body;
    const createEspecialidadeMedica = new _CreateEspecialidadeMedicaService.default();
    const especialidadeMedica = await createEspecialidadeMedica.execute({
      name
    });
    return response.json(especialidadeMedica);
  }
  async update(request, response) {
    const {
      name
    } = request.body;
    const {
      id
    } = request.params;
    const updateEspecialidadeMedica = new _UpdateProcedimentosService.default();
    const EspecialidadeMedica = await updateEspecialidadeMedica.execute({
      id,
      name
    });
    return response.json(EspecialidadeMedica);
  }
  async delete(request, response) {
    const {
      id
    } = request.params;
    const deleteEspecialidadeMedica = new _DeleteProcedimentosService.default();
    await deleteEspecialidadeMedica.execute({
      id
    });
    return response.json([]);
  }
}
exports.default = EspecialidadeMedicasController;