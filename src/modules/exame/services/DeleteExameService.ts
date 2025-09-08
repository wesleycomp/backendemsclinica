import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";

interface IRequest{
    id: string
}


class DeleteExameService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameRepository = getCustomRepository(ExameRepository);
        const exame = await exameRepository.findOne(id);

        if(!exame){
            throw new AppError('Função não encontrada')
        }

        await exameRepository.remove(exame)

    }
}

export default DeleteExameService;
