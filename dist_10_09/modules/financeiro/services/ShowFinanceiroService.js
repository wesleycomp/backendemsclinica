"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FinanceiroRepository = require("../typeorm/repositories/FinanceiroRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowFinanceiroService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const financeiroRepository = (0, _typeorm.getCustomRepository)(_FinanceiroRepository.FinanceiroRepository);
    const financeiro = await financeiroRepository.findOne(id);
    if (!financeiro) {
      throw new _AppError.default('Exames  não encontrados');
    }
    return financeiro;
  }
}
var _default = exports.default = ShowFinanceiroService;