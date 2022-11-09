import { getCustomRepository } from "typeorm";
import TipoPagamento from "../typeorm/entities/TipoPagamento";
import { TipoPagamentoRepository } from "../typeorm/repositories/TipoPagamentoRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowtipoPagamentosService{

    public async execute({id}: IRequest): Promise<TipoPagamento>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const tipoPagamentosRepository = getCustomRepository(TipoPagamentoRepository);
        const paciente = await tipoPagamentosRepository.findOne(id);

        if(!paciente){
            throw new AppError('Tipo Pagamento não encontrado')
        }

        return paciente;
    }
}

export default ShowtipoPagamentosService;
