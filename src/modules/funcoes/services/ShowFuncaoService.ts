import { getCustomRepository } from "typeorm";
import Funcao from "../typeorm/entities/Funcao";
import { FuncaoRepository } from "../typeorm/repositories/FuncoesRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}


class ShowFuncaoService{

    public async execute({id}: IRequest): Promise<Funcao>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(FuncaoRepository);
        const funcao = await funcoesRepository.findOne(id);

        if(!funcao){
            throw new AppError('Função não encontrada')
        }


        return funcao;


    }
}

export default ShowFuncaoService;
