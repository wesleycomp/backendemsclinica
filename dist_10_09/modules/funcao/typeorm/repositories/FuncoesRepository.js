"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FuncaoRepository = void 0;
var _typeorm = require("typeorm");
var _Funcao = _interopRequireDefault(require("../entities/Funcao"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let FuncaoRepository = exports.FuncaoRepository = (_dec = (0, _typeorm.EntityRepository)(_Funcao.default), _dec(_class = class FuncaoRepository extends _typeorm.Repository {
  async findByName(name) {
    const funcao = await this.findOne({
      where: {
        name
      }
    });
    return funcao;
  }
  async findById(id) {
    const funcao = await this.findOne({
      where: {
        id
      }
    });
    return funcao;
  }
}) || _class);
var _default = exports.default = FuncaoRepository;