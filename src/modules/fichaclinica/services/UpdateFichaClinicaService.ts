import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import FichaClinica from "../typeorm/entities/FichaClinica";
import { FichaClinicaRepository } from "../typeorm/repositories/FichaClinicaRepository";

    interface IRequestResposta{
        id: string;
        resposta: string;
    }

    interface IRequestObservacao{
        id: string;
        observacao: string;
    }


class UpdateFichaClinicaService{

    public async executeResposta({id,resposta}: IRequestResposta): Promise<FichaClinica>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
            const fichaClinicaRepository = getCustomRepository(FichaClinicaRepository);
            const fichaClinica = await fichaClinicaRepository.findOne(id);

            if(!fichaClinica){
                throw new AppError('Ficha Clinica não encontrada')
            }

            fichaClinica.resposta = resposta;

            await fichaClinicaRepository.save(fichaClinica)
            return fichaClinica;
    }

    public async executeObservacao({id,observacao}: IRequestObservacao): Promise<FichaClinica>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
            const fichaClinicaRepository = getCustomRepository(FichaClinicaRepository);
            const fichaClinica = await fichaClinicaRepository.findOne(id);

            if(!fichaClinica){
                throw new AppError('Ficha Clinica não encontrada')
            }

            fichaClinica.observacao = observacao;

            await fichaClinicaRepository.save(fichaClinica)
            console.log(fichaClinica)
            return fichaClinica;
    }
}

export default UpdateFichaClinicaService;
