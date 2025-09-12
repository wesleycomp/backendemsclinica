"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProcedimentosRepository = void 0;
var _typeorm = require("typeorm");
var _Procedimentos = _interopRequireDefault(require("../entities/Procedimentos"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let ProcedimentosRepository = exports.ProcedimentosRepository = (_dec = (0, _typeorm.EntityRepository)(_Procedimentos.default), _dec(_class = class ProcedimentosRepository extends _typeorm.Repository {
  async findByName(name) {
    const Procedimentos = await this.findOne({
      where: {
        name
      }
    });
    return Procedimentos;
  }
  async findById(id) {
    const Procedimentos = await this.findOne({
      where: {
        id
      }
    });
    return Procedimentos;
  }
}) || _class);
var _default = exports.default = ProcedimentosRepository;