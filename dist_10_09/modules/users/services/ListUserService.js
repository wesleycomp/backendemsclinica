"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeorm = require("typeorm");
var _UsersRepository = require("../typeorm/repositories/UsersRepository");
// interface IPaginationUsers{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: User[];

// }

class ListUserService {
  // public async execute(): Promise<User[]>{

  //      //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
  //     const usersRepository = getCustomRepository(UsersRepository);
  //     const user = usersRepository.find();

  //     return user;
  // }

  //testeando o git para atualizar o servidor
  async execute() {
    //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    const usersRepository = (0, _typeorm.getCustomRepository)(_UsersRepository.UsersRepository);
    // const user = await usersRepository.createQueryBuilder().paginate();
    // return user as IPaginationUsers;
    const user = await usersRepository.find();
    return user;
  }
}
var _default = exports.default = ListUserService;