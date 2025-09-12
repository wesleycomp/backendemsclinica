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
        const tipopagamento = await tipoPagamentosRepository.findOne({ where: { id } });

        if(!tipopagamento){
            throw new AppError('Tipo Pagamento não encontrado')
        }

        return tipopagamento;
    }
}

export default ShowtipoPagamentosService;
