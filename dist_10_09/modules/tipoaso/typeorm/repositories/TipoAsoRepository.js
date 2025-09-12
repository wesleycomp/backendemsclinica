"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TipoAsoRepository = void 0;
var _typeorm = require("typeorm");
var _TipoAso = _interopRequireDefault(require("../../../aso/typeorm/entities/TipoAso"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let TipoAsoRepository = exports.TipoAsoRepository = (_dec = (0, _typeorm.EntityRepository)(_TipoAso.default), _dec(_class = class TipoAsoRepository extends _typeorm.Repository {
  async findByName(codigo) {
    const TipoAso = await this.findOne({
      where: {
        codigo
      }
    });
    return TipoAso;
  }
  async findById(codigo) {
    const TipoAso = await this.findOne({
      where: {
        codigo
      }
    });
    return TipoAso;
  }
}) || _class);
var _default = exports.default = TipoAsoRepository;