import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";

interface IRequest{
    id: string;

}


class UpdateExameService{

    public async execute({id, }: IRequest): Promise<Exame>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameRepository = getCustomRepository(ExameRepository);
        const Exame = await exameRepository.findOne(id);

        if(!Exame){
            throw new AppError('Exame não encontrada')
        }


        const ExameExists= await exameRepository.findByName(name)

        if(ExameExists && name != Exame.name){

            throw new AppError('Exame ja existente')
        }

        Exame.name = name;


        await exameRepository.save(Exame)

        return Exame;
    }
}

export default UpdateExameService;
