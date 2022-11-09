import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}

class ShowAsosService{

    public async execute({id}: IRequest): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findById(id);

        if(!aso){
            throw new AppError('Aso não encontrado')
        }

        return aso;

    }
}

export default ShowAsosService;
