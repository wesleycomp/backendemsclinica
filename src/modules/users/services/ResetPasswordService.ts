import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import UsersTokensRepository from "../typeorm/repositories/UsersTokensRepository";

import {isAfter, addHours} from 'date-fns';
import { hash } from "bcryptjs";

interface IRequest{
    token: string;
    password: string;
}

class ResetPasswordService{

    public async execute({token, password}: IRequest): Promise<void>{

        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UsersTokensRepository);

        const userToken = await userTokensRepository.findByToken(token)

        if(!userToken){
            throw new AppError('User Token not exist')
        }

        const user = await usersRepository.findById(userToken.user_id);

        if(!user){
            throw new AppError('User not exist')
        }

        const tokenCreatAt = userToken.created_at;
        const compareDate = addHours(tokenCreatAt, 2);

        if(isAfter(Date.now(), compareDate)){

            throw new AppError('Token expired.')
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user);

    }
}

export default ResetPasswordService;
