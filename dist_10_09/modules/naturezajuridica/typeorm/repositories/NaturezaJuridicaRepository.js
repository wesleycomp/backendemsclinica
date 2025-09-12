"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NacionaliadeRepository = void 0;
var _typeorm = require("typeorm");
var _NaturezaJuridica = _interopRequireDefault(require("../entities/NaturezaJuridica"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let NacionaliadeRepository = exports.NacionaliadeRepository = (_dec = (0, _typeorm.EntityRepository)(_NaturezaJuridica.default), _dec(_class = class NacionaliadeRepository extends _typeorm.Repository {
  async findByName(codigo) {
    const naturezaJuridica = await this.findOne({
      where: {
        codigo
      }
    });
    return naturezaJuridica;
  }
  async findById(codigo) {
    const naturezaJuridica = await this.findOne({
      where: {
        codigo
      }
    });
    return naturezaJuridica;
  }
}) || _class);
var _default = exports.default = NacionaliadeRepository;