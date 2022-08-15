import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";

interface IRequest{
    id: string;
    name:string;

}


class UpdateExameService{

    public async execute({id, name }: IRequest): Promise<Exame>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameRepository = getCustomRepository(ExameRepository);
        const exame = await exameRepository.findOne(id);

        if(!exame){
            throw new AppError('Exame não encontrada')
        }


        const ExameExists= await exameRepository.findByName(name)

        if(ExameExists && name != exame.name){

            throw new AppError('Exame ja existente')
        }

        exame.name = name;


        await exameRepository.save(exame)

        return exame;
    }
}

export default UpdateExameService;
