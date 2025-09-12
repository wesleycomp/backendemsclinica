"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _PacientesRepository = _interopRequireDefault(require("../typeorm/repositories/PacientesRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// interface IPaginationPacientes{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Pacientes[];

// }

class ListPacientesService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const pacientesRepository = (0, _typeorm.getCustomRepository)(_PacientesRepository.default);
    const pacientes = await pacientesRepository.findPacientesAll();
    return pacientes;
  }
}
var _default = exports.default = ListPacientesService;