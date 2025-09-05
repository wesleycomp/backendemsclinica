import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";


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

class ListUserService{

    // public async execute(): Promise<User[]>{

    //      //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    //     const usersRepository = getCustomRepository(UsersRepository);
    //     const user = usersRepository.find();

    //     return user;
    // }

//testeando o git para atualizar o servidor
    public async execute(): Promise<User[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const usersRepository = getCustomRepository(UsersRepository);
       // const user = await usersRepository.createQueryBuilder().paginate();
       // return user as IPaginationUsers;
        const user = await usersRepository.find();
        return user;
    }



}

export default ListUserService;
