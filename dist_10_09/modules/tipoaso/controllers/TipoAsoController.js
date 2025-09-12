"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListTipoAsoServices = _interopRequireDefault(require("../services/ListTipoAsoServices"));
var _ShowTipoAsoServices = _interopRequireDefault(require("../services/ShowTipoAsoServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class TipoAsoController {
  async index(request, response) {
    const listTipoAsoes = new _ListTipoAsoServices.default();
    const TipoAsoes = await listTipoAsoes.execute();
    return response.json(TipoAsoes);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showTipoAsoes = new _ShowTipoAsoServices.default();
    const TipoAsoes = await showTipoAsoes.execute({
      id
    });
    return response.json(TipoAsoes);
  }
}
exports.default = TipoAsoController;