import { getCustomRepository } from "typeorm";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";

import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string,
    user_exclusao:string
}


class DeleteAsoService{

    public async execute({id,user_exclusao}: IRequest): Promise<void>{



        console.log(user_exclusao)
        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asoRepository = getCustomRepository(AsosRepository);
         const aso = await asoRepository.findOne(id);

        if(!aso){
            throw new AppError('Aso não encontrada')
        }



        await asoRepository.remove(aso)

    }
}

export default DeleteAsoService;
