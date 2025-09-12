"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ProcedimentosRepository = require("../typeorm/repositories/ProcedimentosRepository");
// interface IPaginationProcedimentos{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Procedimentos[];

// }

class ListProcedimentosService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const procedimentosRepository = (0, _typeorm.getCustomRepository)(_ProcedimentosRepository.ProcedimentosRepository);
    const Procedimentos = procedimentosRepository.find();
    //   const Procedimentos = await procedimentosRepository.createQueryBuilder().paginate();

    //console.log(Procedimentos)
    return Procedimentos;
  }
}
var _default = exports.default = ListProcedimentosService;