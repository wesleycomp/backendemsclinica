import { getCustomRepository } from "typeorm";
import { MedicoExaminadorRepository } from "../typeorm/repositories/MedicoExaminadorRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class DeleteMedicoExaminadorServices{

    public async execute({id}: IRequest): Promise<void>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicoExaminadorRepository = getCustomRepository(MedicoExaminadorRepository);
        const medicoExaminador  = await medicoExaminadorRepository.findOne(id);

        if(!medicoExaminador){
            throw new AppError('medico Examinador não encontrado')
        }

            await medicoExaminadorRepository.delete(medicoExaminador);
       // return paciente;
    }
}

export default DeleteMedicoExaminadorServices;
