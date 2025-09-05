import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}


class ShowFuncaoService{

    public async execute({id}: IRequest): Promise<Exame>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameRepository = getCustomRepository(ExameRepository);
        const exame = await exameRepository.findById(id);

        if(!exame){
            throw new AppError('Exame não encontrado')
        }


        return exame;


    }



    public async listExamesPorLocal(): Promise<Exame[]>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
         const exameRepository = getCustomRepository(ExameRepository);
         const exame = await exameRepository.findExamesPorLocal( );

         if(!exame){
             throw new AppError('Exame não encontrado')
         }


         return exame;


     }

}

export default ShowFuncaoService;
