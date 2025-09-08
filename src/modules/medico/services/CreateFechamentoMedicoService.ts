  import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import MedicoFechamento from '../typeorm/entities/MedicoFechamento';
import {MedicoFechamentoRepository} from "../typeorm/repositories/MedicoFechamentoRepository";

interface IRequest{
    medico_id: string;
    valor: number;
    exame_id: string;
}

class CreateFechamentoMedicoService{

    public async execute({medico_id, valor, exame_id}: IRequest): Promise<MedicoFechamento>{

        const medicosFechamentoRepository = getCustomRepository(MedicoFechamentoRepository);

        const medico = medicosFechamentoRepository.create({
           medico_id,
           valor,
           exame_id
        });

        await medicosFechamentoRepository.save(medico);
        return medico;
    }
}

export default CreateFechamentoMedicoService;
