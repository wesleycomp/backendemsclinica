"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CentroCustoRepository = void 0;
var _typeorm = require("typeorm");
var _CentroCusto = _interopRequireDefault(require("../entities/CentroCusto"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let CentroCustoRepository = exports.CentroCustoRepository = (_dec = (0, _typeorm.EntityRepository)(_CentroCusto.default), _dec(_class = class CentroCustoRepository extends _typeorm.Repository {
  async findByNome(nome) {
    return this.findOne({
      where: {
        nome
      }
    });
  }
  async findAll() {
    return this.find({
      order: {
        nome: 'ASC'
      }
    });
  }
}) || _class);
var _default = exports.default = CentroCustoRepository;