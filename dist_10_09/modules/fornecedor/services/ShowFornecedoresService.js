"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FornecedorRepository = require("../typeorm/repositories/FornecedorRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowFornecedorService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fornecedorRepository = (0, _typeorm.getCustomRepository)(_FornecedorRepository.FornecedorRepository);
    const fornecedor = await fornecedorRepository.findOne(id);
    if (!fornecedor) {
      throw new _AppError.default('Fornecedor não encontrada');
    }
    return fornecedor;
  }
}
var _default = exports.default = ShowFornecedorService;