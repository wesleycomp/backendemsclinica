"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListNacionalidadeServices = _interopRequireDefault(require("../services/ListNacionalidadeServices"));
var _ShowNacionalidadeServices = _interopRequireDefault(require("../services/ShowNacionalidadeServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class NacionalidadeController {
  async index(request, response) {
    const listNacionalidade = new _ListNacionalidadeServices.default();
    const naciolidades = await listNacionalidade.execute();
    return response.json(naciolidades);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showNacionalidades = new _ShowNacionalidadeServices.default();
    const nacionalidades = await showNacionalidades.execute({
      id
    });
    return response.json(nacionalidades);
  }
}
exports.default = NacionalidadeController;