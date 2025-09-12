import { getCustomRepository } from "typeorm";
import CategoriaTrabalhador from "../typeorm/entities/CategoriaTrabalhador";
import { CategoriaTrabalhadorRepository } from "../typeorm/repositories/CategoriaTrabalhadorRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowCategoriaTrabalhadoresService{

    public async execute({id}: IRequest): Promise<CategoriaTrabalhador>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const categoriaTrabalhadoresRepository = getCustomRepository(CategoriaTrabalhadorRepository);
        const paciente = await categoriaTrabalhadoresRepository.findOne(id);

        if(!paciente){
            throw new AppError('Categoria não encontrado')
        }

        return paciente;
    }
}

export default ShowCategoriaTrabalhadoresService;
