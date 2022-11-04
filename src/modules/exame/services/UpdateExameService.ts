import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";

interface IExame{

    id:string,
    especialidademedica_id: string;
    name: string;
    codigoesocial: string;
    valoravista: number;
    valormedico: number;
    valorems: number;
    ativo: boolean;

}

class UpdateExameService{

    public async execute({id,especialidademedica_id,name,codigoesocial,valoravista,valormedico,valorems,ativo}: IExame): Promise<Exame>{

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
        exame.codigoesocial= codigoesocial;
         exame.especialidademedica_id = especialidademedica_id;
          exame.valoravista = valoravista;
           exame.valormedico = valormedico;
            exame.valorems = valorems;
             exame.ativo = ativo;

        await exameRepository.save(exame)

        return exame;
    }
}

export default UpdateExameService;
