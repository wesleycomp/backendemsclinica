import { getCustomRepository } from "typeorm";
import TipoAso from "../../aso/typeorm/entities/TipoAso";
import { TipoAsoRepository } from "../typeorm/repositories/TipoAsoRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowtipoAsosService{

    public async execute({id}: IRequest): Promise<TipoAso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const tipoAsosRepository = getCustomRepository(TipoAsoRepository);
        const paciente = await tipoAsosRepository.findOne({ where: { id } });

        if(!paciente){
            throw new AppError('Tipo Aso não encontrado')
        }

        return paciente;
    }
}

export default ShowtipoAsosService;
