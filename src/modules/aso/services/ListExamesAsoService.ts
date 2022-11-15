import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';


class ListExamesAsoService{

    public async execute(): Promise<ExamesAso[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
       const examesAsoRepository = getCustomRepository(ExamesAsoRepository);
       const examesAso = examesAsoRepository.findAll();
       // const exame = await funcoesRepository.createQueryBuilder().paginate();
       //console.log(exame)
        return examesAso;
    }
}

export default ListExamesAsoService;
