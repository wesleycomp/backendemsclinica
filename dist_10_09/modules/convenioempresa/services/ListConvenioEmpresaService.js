"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _ConvenioEmpresaRepository = require("../typeorm/repositories/ConvenioEmpresaRepository");
// interface IPaginationConvenioEmpresa{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: ConvenioEmpresa[];

// }

class ListConvenioEmpresaService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const convenioEmpresaRepository = (0, _typeorm.getCustomRepository)(_ConvenioEmpresaRepository.ConvenioEmpresaRepository);
    const ConvenioEmpresa = convenioEmpresaRepository.findAll(); //reescrevi para buscar a empresa e o exame no msmo objeto
    //   const ConvenioEmpresa = await convenioEmpresaRepository.createQueryBuilder().paginate();
    //console.log(ConvenioEmpresa)
    return ConvenioEmpresa;
  }
}
var _default = exports.default = ListConvenioEmpresaService;