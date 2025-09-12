"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FinanceiroRepository = require("../typeorm/repositories/FinanceiroRepository");
// interface IPaginationFuncao{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Funcao[];

// }

class ListFinanceiroService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const financeiroRepository = (0, _typeorm.getCustomRepository)(_FinanceiroRepository.FinanceiroRepository);
    const financeiro = financeiroRepository.findByFechamento();
    //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

    //console.log(funcao)
    return financeiro;
  }
}
var _default = exports.default = ListFinanceiroService;