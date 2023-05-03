import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    aso_id: string
}

interface IRequest2{
    datainicio: string,
    datafim: string,
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
    public async executeExamesPeriodo({datainicio,datafim}:IRequest2): Promise<ExamesAso[] | undefined>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)

        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso = await examesAsosRepository.findExamesRealizadosPeriodo(datainicio,datafim);

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }

        return examesAso;
    }


    public async executeExames(): Promise<ExamesAso[] | undefined>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)

        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso = await examesAsosRepository.findExamesRealizados();

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }

        return examesAso;
    }


    public async executeValoresAso({aso_id}: IRequest): Promise<ExamesAso[] | undefined>{

        const examesAsosRepository = getCustomRepository(ExamesAsoRepository);
        const examesAso = await examesAsosRepository.findExamesByAso(aso_id);

        if(!examesAso){
            throw new AppError('Aso não encontrado')
        }
        return examesAso;
    }


}

export default ShowExamesAsosService;

