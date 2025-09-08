import { getCustomRepository } from "typeorm";
import { PacientesRepository } from "../typeorm/repositories/PacientesRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class DeletePacientesService{

    public async execute({id}: IRequest): Promise<void>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacienteRepository = getCustomRepository(PacientesRepository);
        const paciente = await pacienteRepository.findOne(id);

        if(!paciente){
            throw new AppError('Paciente não encontrado')
        }

            await pacienteRepository.delete(paciente);
       // return paciente;
    }
}

export default DeletePacientesService;
