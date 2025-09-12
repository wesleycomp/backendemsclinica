"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _EmpresaRepository = require("../typeorm/repositories/EmpresaRepository");
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

class ListEmpresaService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const empresaRepository = (0, _typeorm.getCustomRepository)(_EmpresaRepository.EmpresaRepository);
    const empresa = empresaRepository.find();
    //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

    //console.log(funcao)
    return empresa;
  }
}
var _default = exports.default = ListEmpresaService;