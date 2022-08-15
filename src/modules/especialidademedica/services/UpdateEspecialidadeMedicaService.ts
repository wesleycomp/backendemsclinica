import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import EspecialidadeMedica from "../typeorm/entities/EspecialidadeMedica";
import { EspecialidadeMedicaRepository } from "../typeorm/repositories/EspecialidadeMedicaRepository";

interface IRequest{
    id: string;
    name: string;
}


class UpdateEspecialidadeMedicaService{

    public async execute({id, name }: IRequest): Promise<EspecialidadeMedica>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const funcoesRepository = getCustomRepository(EspecialidadeMedicaRepository);
        const EspecialidadeMedica = await funcoesRepository.findOne(id);

        if(!EspecialidadeMedica){
            throw new AppError('Especialidade não encontrada')
        }


        const EspecialidadeMedicaExists= await funcoesRepository.findByName(name)

        if(EspecialidadeMedicaExists && name != EspecialidadeMedica.name){

            throw new AppError('Especialidade Medica ja existente')
        }

        EspecialidadeMedica.name = name;

        await funcoesRepository.save(EspecialidadeMedica)

        return EspecialidadeMedica;
    }
}

export default UpdateEspecialidadeMedicaService;
