import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';


interface IExameAso{
    aso_id: string;
    exame_id: string;
    valorexame: number;
    tipopagamento_id: string;
    valormedico: number;
    valorems: number;
    ativo: boolean;
    user_id: string;


}
class CreateExameAsoService{

    public async execute({ aso_id,exame_id,valorexame,valormedico,valorems,ativo,tipopagamento_id}: IExameAso): Promise<ExamesAso>{

    //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const examesAsoRepository = getCustomRepository(ExamesAsoRepository);

        const examesAso = examesAsoRepository.create({
         aso: { id: aso_id },exame_id,valorexame,valormedico,valorems,ativo,tipopagamento_id
        });

        await examesAsoRepository.save(examesAso);
        return examesAso;
    }
}

export default CreateExameAsoService;
