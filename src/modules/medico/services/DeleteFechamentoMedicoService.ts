import { getCustomRepository } from "typeorm";
import { MedicoFechamentoRepository } from "../typeorm/repositories/MedicoFechamentoRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class DeleteFechamentoMedicosService{

    public async execute({id}: IRequest): Promise<void>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicoFechamentoRepository = getCustomRepository(MedicoFechamentoRepository);
        const medicoFechamento = await medicoFechamentoRepository.findOne(id);

        if(!medicoFechamento){
            throw new AppError('Item de Fechamento Medico não encontrado')
        }

            await medicoFechamentoRepository.delete(medicoFechamento);
       // return paciente;
    }
}

export default DeleteFechamentoMedicosService;
