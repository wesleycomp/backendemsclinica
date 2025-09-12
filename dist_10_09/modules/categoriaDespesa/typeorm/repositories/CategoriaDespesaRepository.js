"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.CategoriaDespesaRepository = void 0;
var _typeorm = require("typeorm");
var _CategoriaDespesa = _interopRequireDefault(require("../entities/CategoriaDespesa"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let CategoriaDespesaRepository = exports.CategoriaDespesaRepository = (_dec = (0, _typeorm.EntityRepository)(_CategoriaDespesa.default), _dec(_class = class CategoriaDespesaRepository extends _typeorm.Repository {
  findByNome(nome) {
    return this.findOne({
      where: {
        nome
      }
    });
  }
  findAll() {
    return this.find({
      order: {
        nome: 'ASC'
      }
    });
  }
}) || _class);
var _default = exports.default = CategoriaDespesaRepository;