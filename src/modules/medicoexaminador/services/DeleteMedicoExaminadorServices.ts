import { getCustomRepository } from "typeorm";
import { MedicosRepository } from "../typeorm/repositories/MedicosRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class DeleteMedicoExaminadorServices{

    public async execute({id}: IRequest): Promise<void>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacienteRepository = getCustomRepository(MedicosRepository);
        const paciente = await pacienteRepository.findOne(id);

        if(!paciente){
            throw new AppError('Paciente não encontrado')
        }

            await pacienteRepository.delete(paciente);
       // return paciente;
    }
}

export default DeleteMedicoExaminadorServices;
