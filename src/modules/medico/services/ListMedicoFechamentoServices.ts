
import { getCustomRepository } from "typeorm";
import MedicoFechamento from "../typeorm/entities/MedicoFechamento";
import { MedicoFechamentoRepository } from "../typeorm/repositories/MedicoFechamentoRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        medico_id: string
    }

  interface IRequest2{

        medico_id: string,
        datainicio: string,
        datafim: string,
        exame_id: string

    }


class ListMedicoFechamentoServices{

    public async execute({medico_id}: IRequest): Promise<MedicoFechamento[]>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fechamentoMedicoRepository = getCustomRepository(MedicoFechamentoRepository);
        const fechamentoMedico = await fechamentoMedicoRepository.findByMedicoFechamento(medico_id);

        if(!fechamentoMedico){
            throw new AppError('medico não encontrado')
        }

        return fechamentoMedico;
    }

  
}

export default ListMedicoFechamentoServices;
