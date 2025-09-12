"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ListCategoriaTrabalhadoresServices = _interopRequireDefault(require("../services/ListCategoriaTrabalhadoresServices"));
var _ShowCategoriaTrabalhadoresServices = _interopRequireDefault(require("../services/ShowCategoriaTrabalhadoresServices"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CategoriaTrabalhadoresController {
  async index(request, response) {
    const listcategoriatrabalhadores = new _ListCategoriaTrabalhadoresServices.default();
    const categoriatrabalhadores = await listcategoriatrabalhadores.execute();
    return response.json(categoriatrabalhadores);
  }
  async show(request, response) {
    const {
      id
    } = request.params;
    const showcategoriatrabalhadores = new _ShowCategoriaTrabalhadoresServices.default();
    const categoriatrabalhadores = await showcategoriatrabalhadores.execute({
      id
    });
    return response.json(categoriatrabalhadores);
  }
}
exports.default = CategoriaTrabalhadoresController;