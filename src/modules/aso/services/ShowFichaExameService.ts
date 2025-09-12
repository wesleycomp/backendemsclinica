import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}

class ShowFichaExameService{

    public async execute({id}: IRequest): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findAllFichaExameById(id);

        if(!aso){
            throw new AppError('Exame de Aso não encontrado')
        }

        return aso;

    }
}

export default ShowFichaExameService;
