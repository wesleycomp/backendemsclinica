"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CategoriaTrabalhadorRepository = void 0;
var _typeorm = require("typeorm");
var _CategoriaTrabalhador = _interopRequireDefault(require("../entities/CategoriaTrabalhador"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let CategoriaTrabalhadorRepository = exports.CategoriaTrabalhadorRepository = (_dec = (0, _typeorm.EntityRepository)(_CategoriaTrabalhador.default), _dec(_class = class CategoriaTrabalhadorRepository extends _typeorm.Repository {
  async findByName(codigo) {
    const CategoriaTrabalhador = await this.findOne({
      where: {
        codigo
      }
    });
    return CategoriaTrabalhador;
  }
  async findById(codigo) {
    const CategoriaTrabalhador = await this.findOne({
      where: {
        codigo
      }
    });
    return CategoriaTrabalhador;
  }
}) || _class);
var _default = exports.default = CategoriaTrabalhadorRepository;