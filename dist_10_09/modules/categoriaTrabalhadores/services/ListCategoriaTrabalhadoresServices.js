"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _CategoriaTrabalhadorRepository = _interopRequireDefault(require("../typeorm/repositories/CategoriaTrabalhadorRepository"));
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

class ListCategoriaTrabalhadoresService {
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const pacientesRepository = (0, _typeorm.getCustomRepository)(_CategoriaTrabalhadorRepository.default);

    // const redisCache = new RedisCache();

    // let pacientes = await redisCache.recover<Pacientes[]>('api-emsclinica-PACIENTES_LIST', )

    // if(!pacientes){

    // pacientes = await pacientesRepository.find();

    //     await redisCache.save('api-emsclinica-PACIENTES_LIST', pacientes);

    // }
    //   return pacientes;

    //   const pacientes = await pacientesRepository.createQueryBuilder().paginate();

    //   return pacientes as IPaginationPacientes;

    const pacientes = await pacientesRepository.find();
    return pacientes;
  }
}
var _default = exports.default = ListCategoriaTrabalhadoresService;