"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _MedicosRepository = _interopRequireDefault(require("../typeorm/repositories/MedicosRepository"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// interface IPaginationMedicos{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Medicos[];

// }

class ListMedicosService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicosRepository = (0, _typeorm.getCustomRepository)(_MedicosRepository.default);
    const Medicos = await medicosRepository.find();
    return Medicos;
  }
  async listMedicoAtivos() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const medicosRepository = (0, _typeorm.getCustomRepository)(_MedicosRepository.default);
    const Medicos = await medicosRepository.findMedicosAtivo();
    return Medicos;
  }
}
var _default = exports.default = ListMedicosService;