import { getCustomRepository } from "typeorm";
import Funcao from "../typeorm/entities/Funcoes";
import { FuncaoRepository } from "../typeorm/repositories/FuncoesRepository";

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
