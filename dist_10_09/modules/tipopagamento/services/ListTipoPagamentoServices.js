"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _TipoPagamentoRepository = _interopRequireDefault(require("../typeorm/repositories/TipoPagamentoRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// interface IPaginationtipopagamentos{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: tipopagamentos[];

// }

class ListTipoPagamentoesService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const tipopagamentosRepository = (0, _typeorm.getCustomRepository)(_TipoPagamentoRepository.default);
    const tipopagamentos = await tipopagamentosRepository.find();
    return tipopagamentos;
  }
}
var _default = exports.default = ListTipoPagamentoesService;