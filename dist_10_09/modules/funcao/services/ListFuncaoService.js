"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FuncoesRepository = require("../typeorm/repositories/FuncoesRepository");
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

class ListFuncaoService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const funcoesRepository = (0, _typeorm.getCustomRepository)(_FuncoesRepository.FuncaoRepository);
    const funcao = funcoesRepository.find();
    //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

    //console.log(funcao)
    return funcao;
  }
}
var _default = exports.default = ListFuncaoService;