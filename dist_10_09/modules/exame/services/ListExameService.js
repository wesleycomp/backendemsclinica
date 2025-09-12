"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ExameRepository = require("../typeorm/repositories/ExameRepository");
// interface IPaginationexame{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: exame[];

// }

class ListExameService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const exameRepository = (0, _typeorm.getCustomRepository)(_ExameRepository.ExameRepository);
    const exame = exameRepository.findAll();
    // const exame = await funcoesRepository.createQueryBuilder().paginate();
    //console.log(exame)
    return exame;
  }
}
var _default = exports.default = ListExameService;