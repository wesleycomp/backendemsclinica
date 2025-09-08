import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";

interface IExame{

    id:string,
    procedimento_id: string;
    name: string;
    valoravista: number;
    valormedico: number;
    valorems: number;
    ativo: boolean;
    usuarioedicao:string;
    localrealizacaoexame: string;

}

class UpdateExameService{

    public async execute({id,procedimento_id,name,valoravista,valormedico,valorems,ativo,usuarioedicao,localrealizacaoexame}: IExame): Promise<Exame>{

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
        exame.procedimento_id = procedimento_id;
        exame.valoravista = valoravista;
        exame.valormedico = valormedico;
        exame.valorems = valorems;
        exame.ativo = ativo;
        exame.usuarioedicao= usuarioedicao;
        exame.localrealizacaoexame = localrealizacaoexame;

        await exameRepository.save(exame)

        return exame;
    }
}

export default UpdateExameService;
