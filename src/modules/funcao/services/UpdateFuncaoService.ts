import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Funcao from "../typeorm/entities/Funcao";
import { FuncaoRepository } from "../typeorm/repositories/FuncoesRepository";

interface IRequest{
    id: string;
    name: string;
    cbo: string;
}


class UpdateFuncaoService{

    public async execute({id, name, cbo}: IRequest): Promise<Funcao>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(FuncaoRepository);
        const funcao = await funcoesRepository.findOne(id);

        if(!funcao){
            throw new AppError('Função não encontrada')
        }


        const funcaoExists= await funcoesRepository.findByName(name)

        if(funcaoExists && name != funcao.name){

            throw new AppError('Funcao ja existente')
        }

        funcao.name = name;
        funcao.cbo = cbo;

        await funcoesRepository.save(funcao)

        return funcao;
    }
}

export default UpdateFuncaoService;
