import { getCustomRepository } from "typeorm";
import { FichaClinicaRepository } from "../typeorm/repositories/FichaClinicaRepository";
import AppError from '@shared/errors/AppError';
interface IRequest{
    id: string
}


class DeleteFichaClinicaService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fichaClinicaRepository = getCustomRepository(FichaClinicaRepository);
        const fichaClinica = await fichaClinicaRepository.findOne(id);

        if(!fichaClinica){
            throw new AppError('Ficha Clinica não encontrada')
        }

        await fichaClinicaRepository.remove(fichaClinica)

    }
}

export default DeleteFichaClinicaService;
