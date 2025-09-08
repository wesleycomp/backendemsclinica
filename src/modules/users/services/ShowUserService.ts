import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowUserService{

    public async execute({id}: IRequest): Promise<User>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findOne(id);

        if(!user){
            throw new AppError('Usuario não encontrado')
        }

        return user;
    }
}

export default ShowUserService;
