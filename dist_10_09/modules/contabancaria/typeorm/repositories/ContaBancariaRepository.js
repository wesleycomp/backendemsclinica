"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ContaBancaria = _interopRequireDefault(require("../entities/ContaBancaria"));
var _dec, _class; // src/modules/contaBancaria/typeorm/repositories/ContaBancariaRepository.ts
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let ContaBancariaRepository = exports.default = (_dec = (0, _typeorm.EntityRepository)(_ContaBancaria.default), _dec(_class = class ContaBancariaRepository extends _typeorm.Repository {
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