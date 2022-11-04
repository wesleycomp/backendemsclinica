import { getCustomRepository } from "typeorm";
import Exame from "../typeorm/entities/Exame";
import { ExameRepository } from "../typeorm/repositories/ExameRepository";
import AppError from '@shared/errors/AppError';


interface IExame{

    especialidademedica_id: string;
    name: string;
    codigoesocial: string;
    valoravista: number;
    valormedico: number;
    valorems: number;
    ativo: boolean;

}

class CreateExameService{

    public async execute({especialidademedica_id,name,codigoesocial,valoravista,valormedico,valorems,ativo}: IExame): Promise<Exame>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const exameRepository = getCustomRepository(ExameRepository);

        const exameExists= await exameRepository.findByName(name)

        if(exameExists){
            throw new AppError('Exame ja existente')
        }



        const exame = exameRepository.create({
            especialidademedica_id,
            name,
            codigoesocial,
            valoravista,
            valormedico,
            valorems,
            ativo
        });

        await exameRepository.save(exame);
        return exame;
    }
}

export default CreateExameService;
