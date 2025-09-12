import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import User from '../typeorm/entities/User';
import {UsersRepository}  from "../typeorm/repositories/UsersRepository";

interface IRequest{
    id: string,
    name: string,
    email: string,
    password: string,
    perfil: string
}

class UpdateUserServices{

    public async execute({id,name, email, password, perfil}: IRequest): Promise<User>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findOne({ where: { id } });


        if(!user){
            throw new AppError('Usuario não encontrada')
        }

            user.password = await hash(password, 8);
            user.name = name;
            user.email = email;
            user.perfil = perfil;

        await usersRepository.save(user);
        return user;

    }
}

export default UpdateUserServices;
