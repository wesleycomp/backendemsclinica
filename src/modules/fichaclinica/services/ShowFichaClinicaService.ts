import { getCustomRepository } from "typeorm";
import FichaClinica from "../typeorm/entities/FichaClinica";
import { FichaClinicaRepository } from "../typeorm/repositories/FichaClinicaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    aso_id: string
}


class ShowFichaClinicaService{

    public async execute({aso_id}: IRequest): Promise<FichaClinica[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fichaClinicaRepository = getCustomRepository(FichaClinicaRepository);
        const fichaClinica = await fichaClinicaRepository.findByIdAso(aso_id);

        if(!fichaClinica){
            throw new AppError('Ficha clinica não encontrada')
        }
        return fichaClinica;
    }
}

export default ShowFichaClinicaService;
