import { getCustomRepository } from "typeorm";
import { FuncaoRepository } from "../typeorm/repositories/FuncoesRepository";

interface IRequest{
    id: string
}


class DeleteFuncaoService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(FuncaoRepository);
        const funcao = await funcoesRepository.findOne(id);

        if(!funcao){
            throw new AppError('Função não encontrada')
        }

        await funcoesRepository.remove(funcao)

    }
}

export default DeleteFuncaoService;
