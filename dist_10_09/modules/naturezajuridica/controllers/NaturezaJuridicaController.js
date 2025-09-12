"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListNaturezaJuridicaServices = _interopRequireDefault(require("../services/ListNaturezaJuridicaServices"));
var _ShowNaturezaJuridicaServices = _interopRequireDefault(require("../services/ShowNaturezaJuridicaServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NaturezaJuridicaController {
  async index(request, response) {
    const listNaturezaJuridica = new _ListNaturezaJuridicaServices.default();
    const naciolidades = await listNaturezaJuridica.execute();
    return response.json(naciolidades);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showNaturezaJuridicas = new _ShowNaturezaJuridicaServices.default();
    const NaturezaJuridicas = await showNaturezaJuridicas.execute({
      id
    });
    return response.json(NaturezaJuridicas);
  }
}
exports.default = NaturezaJuridicaController;