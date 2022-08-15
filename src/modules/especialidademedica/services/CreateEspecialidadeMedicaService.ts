import { getCustomRepository } from "typeorm";
import EspecialidadeMedica from "../typeorm/entities/EspecialidadeMedica";
import { EspecialidadeMedicaRepository } from "../typeorm/repositories/EspecialidadeMedicaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    name: string;
}

class CreateEspecialidadeMedicaService{

    public async execute({name}: IRequest): Promise<EspecialidadeMedica>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const especialidadeMedicaRepository = getCustomRepository(EspecialidadeMedicaRepository);

        const EspecialidadeMedicaExists= await especialidadeMedicaRepository.findByName(name)

        if(EspecialidadeMedicaExists){

            throw new AppError('EspecialidadeMedica ja existente')

        }

        const EspecialidadeMedica = especialidadeMedicaRepository.create({
            name
        });

        await especialidadeMedicaRepository.save(EspecialidadeMedica)

        return EspecialidadeMedica;

    }
}

export default CreateEspecialidadeMedicaService;
