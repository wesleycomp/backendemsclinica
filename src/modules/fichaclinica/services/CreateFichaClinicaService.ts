import { getCustomRepository } from "typeorm";
import FichaClinica from "../typeorm/entities/FichaClinica";
import { FichaClinicaRepository } from "../typeorm/repositories/FichaClinicaRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    aso_id: string;
    pergunta: string;
    resposta: string;
    observacao: string;

}

class CreateFichaClinicaService{

    public async execute({
                    aso_id,
                    pergunta,
                    resposta,
                    observacao
                }: IRequest): Promise<FichaClinica>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
        const fichaClinicaRepository = getCustomRepository(FichaClinicaRepository);

     //   const  empresaExists= await fichaClinicaRepository.findByName(pergunta)
        // if(empresaExists){
        //     throw new AppError('Perg ja existente')
        // }

        const fichaClinica = fichaClinicaRepository.create({
                    aso_id,
                    pergunta,
                    resposta,
                    observacao
        });

        await fichaClinicaRepository.save(fichaClinica)
        return fichaClinica;
    }
}

export default CreateFichaClinicaService;
