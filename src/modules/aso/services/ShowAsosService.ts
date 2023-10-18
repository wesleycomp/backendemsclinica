import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}


interface IRequestASO{
    aso_id: string
}
class ShowAsosService{

    public async execute({id}: IRequest): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findById(id);

        if(!aso){
            throw new AppError('Exame de Aso não encontrado')
        }

        return aso;

    }


        public async findAso({aso_id}: IRequestASO): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findById(aso_id);

        if(!aso){
            throw new AppError('Exame de Aso não encontrado')
        }

        return aso;

    }
}

export default ShowAsosService;
