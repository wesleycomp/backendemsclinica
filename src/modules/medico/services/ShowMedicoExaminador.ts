import { getCustomRepository } from "typeorm";
import MedicoExaminador from "../typeorm/entities/MedicoExaminador";
import { MedicoExaminadorRepository } from "../typeorm/repositories/MedicoExaminadorRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowExaminadorService{

    public async execute({id}: IRequest): Promise<MedicoExaminador>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicoExaminadorRepository = getCustomRepository(MedicoExaminadorRepository);
        const medicoExaminador = await medicoExaminadorRepository.findOne(id);

        if(!medicoExaminador){
            throw new AppError('medico examinador não encontrado')
        }

        return medicoExaminador;
    }


    public async ListMedicoExaminador(): Promise<MedicoExaminador[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicoExaminadorRepository = getCustomRepository(MedicoExaminadorRepository);
        const medicoExaminador = await medicoExaminadorRepository.find();
        return medicoExaminador;
    }
      public async ListAllMedicoExaminadorOrder(): Promise<MedicoExaminador[] | undefined>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicoExaminadorRepository = getCustomRepository(MedicoExaminadorRepository);
        const medicoExaminador = await medicoExaminadorRepository.ListAllOrder();
        return medicoExaminador;
    }


}

export default ShowExaminadorService;
