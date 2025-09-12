import { getCustomRepository } from "typeorm";
import Nacionalidade from "../typeorm/entities/Nacionalidade";
import { NacionaliadeRepository } from "../typeorm/repositories/NacionalidadeRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowNacionalidadeService{

    public async execute({id}: IRequest): Promise<Nacionalidade>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const nacionalidadeRepository = getCustomRepository(NacionaliadeRepository);
        const paciente = await nacionalidadeRepository.findOne(id);

        if(!paciente){
            throw new AppError('Nacionalidade não encontrado')
        }

        return paciente;
    }
}

export default ShowNacionalidadeService;
