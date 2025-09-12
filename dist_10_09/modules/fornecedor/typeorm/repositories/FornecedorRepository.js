"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.FornecedorRepository = void 0;
var _typeorm = require("typeorm");
var _Fornecedor = _interopRequireDefault(require("../entities/Fornecedor"));
var _dec, _class;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
let FornecedorRepository = exports.FornecedorRepository = (_dec = (0, _typeorm.EntityRepository)(_Fornecedor.default), _dec(_class = class FornecedorRepository extends _typeorm.Repository {
  async findByName(nome) {
    const Fornecedor = await this.findOne({
      where: {
        nome
      }
    });
    return Fornecedor;
  }
  async findById(id) {
    const Fornecedor = await this.findOne({
      where: {
        id
      }
    });
    return Fornecedor;
  }
}) || _class);
var _default = exports.default = FornecedorRepository;