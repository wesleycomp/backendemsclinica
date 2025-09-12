"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DespesaParcelaRepository = void 0;
var _typeorm = require("typeorm");
var _DespesaParcela = _interopRequireDefault(require("../entities/DespesaParcela"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let DespesaParcelaRepository = exports.DespesaParcelaRepository = (_dec = (0, _typeorm.EntityRepository)(_DespesaParcela.default), _dec(_class = class DespesaParcelaRepository extends _typeorm.Repository {
  async listByDespesa(despesa_id) {
    return this.find({
      where: {
        despesa_id
      },
      order: {
        numero: 'ASC'
      }
    });
  }
  async findById(id) {
    return this.findOne(id);
  }
}) || _class);
var _default = exports.default = DespesaParcelaRepository;