import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    aso_id: string
}

class ShowExamesAsosService{

    public async execute({aso_id}: IRequest): Promise<ExamesAso[]>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso = await examesAsosRepository.findByAso(aso_id);

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }

        return examesAso;
    }


    public async executeValoresAso({aso_id}: IRequest): Promise<ExamesAso[]>{

        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso2 = await examesAsosRepository.findExamesByAso(aso_id);

        if(!examesAso2){
            throw new AppError('Aso não encontrado')
        }
        return examesAso2;
    }


}

export default ShowExamesAsosService;

