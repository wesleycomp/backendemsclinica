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
        const pacienteRepository = getCustomRepository(MedicosRepository);
        const paciente = await pacienteRepository.findOne(id);

        if(!paciente){
            throw new AppError('Paciente não encontrado')
        }

        return paciente;
    }
}

export default ShowMedicosService;
