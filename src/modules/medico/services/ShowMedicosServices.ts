import { getCustomRepository } from "typeorm";
import Medicos from "../typeorm/entities/Medico";
import { MedicosRepository } from "../typeorm/repositories/MedicosRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowMedicosService{

    public async execute({id}: IRequest): Promise<Medicos>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicoRepository = getCustomRepository(MedicosRepository);
        const medico = await medicoRepository.findOne(id);

        if(!medico){
            throw new AppError('medico não encontrado')
        }

        return medico;
    }
}

export default ShowMedicosService;
