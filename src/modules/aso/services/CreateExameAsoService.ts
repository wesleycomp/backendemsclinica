import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';


interface IExameAso{
    aso_id: string;
    exame_id: string;
    valorexame: number;
    valormedico: number;
    valorems: number;
    ativo: boolean;

}
class CreateExameAsoService{

    public async execute({aso_id,exame_id,valorexame,valormedico,valorems,ativo }: IExameAso): Promise<ExamesAso>{

    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const examesAsoRepository = getCustomRepository(ExamesAsoRepository);

        const examesAso = examesAsoRepository.create({
         aso_id,exame_id,valorexame,valormedico,valorems,ativo
        });

        await examesAsoRepository.save(examesAso);
        return examesAso;
    }
}

export default CreateExameAsoService;
