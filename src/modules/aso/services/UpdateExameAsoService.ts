import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import ExameAso from "../typeorm/entities/ExamesAso";

interface IExameAso{
    id: string;
    valorexamesemdesconto: number;
    desconto: boolean;
    user_desconto:string;
}

class UpdateExameAsoService{

    public async execute({id,valorexamesemdesconto,desconto,user_desconto}: IExameAso): Promise<ExameAso>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
        const exameaso = await exameAsoRepository.findOne(id);

        if(!exameaso){
            throw new AppError('Exame não encontrada')
        }

        exameaso.desconto = desconto;
        exameaso.valorexamesemdesconto = valorexamesemdesconto;
        exameaso.user_desconto = user_desconto;


        await exameAsoRepository.save(exameaso)

        return exameaso;
    }
}

export default UpdateExameAsoService;
