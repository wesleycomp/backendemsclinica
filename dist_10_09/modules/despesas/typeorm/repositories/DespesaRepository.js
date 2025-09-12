"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DespesaRepository = void 0;
var _typeorm = require("typeorm");
var _Despesa = _interopRequireDefault(require("../entities/Despesa"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let DespesaRepository = exports.DespesaRepository = (_dec = (0, _typeorm.EntityRepository)(_Despesa.default), _dec(_class = class DespesaRepository extends _typeorm.Repository {
  async findById(id) {
    return this.findOne({
      where: {
        id
      }
    });
  }
  async findAll() {
    return this.find({
      order: {
        created_at: 'DESC'
      }
    });
  }
}) || _class);
var _default = exports.default = DespesaRepository;