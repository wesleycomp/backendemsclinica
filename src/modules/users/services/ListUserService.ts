import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

class ListUserService{

    public async execute(): Promise<User[]>{


         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const usersRepository = getCustomRepository(UsersRepository);
        const user = usersRepository.find();

        return user;


    }
}

export default ListUserService;
