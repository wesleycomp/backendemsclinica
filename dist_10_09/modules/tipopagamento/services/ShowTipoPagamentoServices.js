"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _TipoPagamentoRepository = require("../typeorm/repositories/TipoPagamentoRepository");
var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ShowtipoPagamentosService {
  async execute({
    id
  }) {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const tipoPagamentosRepository = (0, _typeorm.getCustomRepository)(_TipoPagamentoRepository.TipoPagamentoRepository);
    const tipopagamento = await tipoPagamentosRepository.findOne(id);
    if (!tipopagamento) {
      throw new _AppError.default('Tipo Pagamento não encontrado');
    }
    return tipopagamento;
  }
}
var _default = exports.default = ShowtipoPagamentosService;