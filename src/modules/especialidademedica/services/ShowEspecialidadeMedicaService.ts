import { getCustomRepository } from "typeorm";
import EspecialidadeMedica from "../typeorm/entities/EspecialidadeMedica";
import { EspecialidadeMedicaRepository } from "../typeorm/repositories/EspecialidadeMedicaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}


class ShowEspecialidadeMedicaService{

    public async execute({id}: IRequest): Promise<EspecialidadeMedica>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(EspecialidadeMedicaRepository);
        const EspecialidadeMedica = await funcoesRepository.findOne(id);

        if(!EspecialidadeMedica){
            throw new AppError('Especialidade não encontrada')
        }


        return EspecialidadeMedica;


    }
}

export default ShowEspecialidadeMedicaService;
