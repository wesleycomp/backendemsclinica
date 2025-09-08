import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import MedicoFechamento from "../typeorm/entities/MedicoFechamento";
import { MedicoFechamentoRepository } from "../typeorm/repositories/MedicoFechamentoRepository";


interface IRequest {

    id: string;
    medico_id: string;
    valor: number;
    exame_id: string;
}

class UpdateFechamentoMedicoService{

    public async execute({ id,
                            medico_id,
                            valor,
                            exame_id

                             }: IRequest): Promise<MedicoFechamento>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const fechamentoMedicoRepository = getCustomRepository(MedicoFechamentoRepository);
        const fechamentoMedico  = await fechamentoMedicoRepository.findById(id);

        if(!fechamentoMedico){
            throw new AppError('medico not found.')
        }

            fechamentoMedico.medico_id = medico_id;
            fechamentoMedico.valor = valor;
            fechamentoMedico.exame_id = exame_id;
            await fechamentoMedicoRepository.save(fechamentoMedico);

            return fechamentoMedico;
    }
}

export default UpdateFechamentoMedicoService;
