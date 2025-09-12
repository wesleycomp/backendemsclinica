"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListPerguntaFichaClinicaService = _interopRequireDefault(require("../services/ListPerguntaFichaClinicaService"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PerguntaFichaClinicaController {
  async index(request, response) {
    const listPerguntas = new _ListPerguntaFichaClinicaService.default();
    const perguntas = await listPerguntas.execute();
    return response.json(perguntas);
  }
}
exports.default = PerguntaFichaClinicaController;