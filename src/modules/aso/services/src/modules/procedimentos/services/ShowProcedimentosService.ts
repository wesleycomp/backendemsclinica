import { getCustomRepository } from "typeorm";
import Procedimentos from "../typeorm/entities/Procedimentos";
import { ProcedimentosRepository } from "../typeorm/repositories/ProcedimentosRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}


class ShowProcedimentosService{

    public async execute({id}: IRequest): Promise<Procedimentos>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const procedimentosRepository = getCustomRepository(ProcedimentosRepository);
        const Procedimentos = await procedimentosRepository.findOne(id);

        if(!Procedimentos){
            throw new AppError(' Procedimento não encontrado')
        }


        return Procedimentos;


    }
}

export default ShowProcedimentosService;
