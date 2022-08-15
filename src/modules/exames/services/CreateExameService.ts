import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    name: string;
    especialidademedica_id: string;
}

class CreateExameService{

    public async execute({name,especialidademedica_id}: IRequest): Promise<Exame>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const exameRepository = getCustomRepository(ExameRepository);

        const ExameExists= await exameRepository.findByName(name)

        if(ExameExists){

            throw new AppError('Exame ja existente')

        }

        const Exame = exameRepository.create({
            name,
            especialidademedica_id
        });

        await exameRepository.save(Exame)

        return Exame;

    }
}

export default CreateExameService;
