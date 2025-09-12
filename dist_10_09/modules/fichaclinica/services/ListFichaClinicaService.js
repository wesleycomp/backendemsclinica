"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _FichaClinicaRepository = require("../typeorm/repositories/FichaClinicaRepository");
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

class ListFichaClinicaService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const fichaclinicaRepository = (0, _typeorm.getCustomRepository)(_FichaClinicaRepository.FichaClinicaRepository);
    const fichaclinica = fichaclinicaRepository.find();
    //   const funcao = await funcoesRepository.createQueryBuilder().paginate();

    //console.log(funcao)
    return fichaclinica;
  }
}
var _default = exports.default = ListFichaClinicaService;