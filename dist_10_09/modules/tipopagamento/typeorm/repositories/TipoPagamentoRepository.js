"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TipoPagamentoRepository = void 0;
var _typeorm = require("typeorm");
var _TipoPagamento = _interopRequireDefault(require("../entities/TipoPagamento"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let TipoPagamentoRepository = exports.TipoPagamentoRepository = (_dec = (0, _typeorm.EntityRepository)(_TipoPagamento.default), _dec(_class = class TipoPagamentoRepository extends _typeorm.Repository {
  async findByName(codigo) {
    const TipoPagamento = await this.findOne({
      where: {
        codigo
      }
    });
    return TipoPagamento;
  }
  async findById(codigo) {
    const TipoPagamento = await this.findOne({
      where: {
        codigo
      }
    });
    return TipoPagamento;
  }
}) || _class);
var _default = exports.default = TipoPagamentoRepository;