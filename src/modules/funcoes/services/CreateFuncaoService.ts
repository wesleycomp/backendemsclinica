import { getCustomRepository } from "typeorm";
import Funcao from "../typeorm/entities/Funcao";
import { FuncaoRepository } from "../typeorm/repositories/FuncoesRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    name: string
}

class CreateFuncaoService{

    public async execute({name}: IRequest): Promise<Funcao>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const funcoesRepository = getCustomRepository(FuncaoRepository);

        const funcaoExists= await funcoesRepository.findByName(name)

        if(funcaoExists){

            throw new AppError('Funcao ja existente')

        }

        const funcao = funcoesRepository.create({
            name
        });

        await funcoesRepository.save(funcao)

        return funcao;


    }
}

export default CreateFuncaoService;
