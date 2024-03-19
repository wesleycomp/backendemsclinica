import { getCustomRepository } from "typeorm";
import HistoricoExamesAsosExcluidasRepository from "../typeorm/repositories/HistoricoExameAsoExcluidoRepository";
import AppError from '@shared/errors/AppError';
import HistoricoExameAsoExcluido from "../typeorm/entities/HistoricoExameAsoExcluido";
import { string } from "joi";

interface IHistoricoExameAsoExcluida{
         aso_id: string,
         exame_id: string,
         ativo: boolean,
         created_at:Date,
         updated_at:Date,
         valorexamesemdesconto: number,
         valorexame: number,
         valormedico: number,
         valorems: number,
         tipopagamento_id: string,
         user_id: string,
         user_desconto: string,
         desconto: boolean,
         motivo: string
}

class CreatehistoricoExameAsoExcluidoService{

     public async execute({aso_id, exame_id, ativo, created_at, updated_at, valorexamesemdesconto, valorexame, valormedico, valorems, tipopagamento_id, user_id, user_desconto, desconto, motivo}: IHistoricoExameAsoExcluida): Promise<HistoricoExameAsoExcluido>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const historicoExameAsoExcluidaRepository = getCustomRepository(HistoricoExamesAsosExcluidasRepository);
    const historicoExameAsoExcluidaService = historicoExameAsoExcluidaRepository.create({
         aso_id,
         exame_id,
         ativo,
         created_at,
         updated_at,
         valorexamesemdesconto,
         valorexame,
         valormedico,
         valorems,
         tipopagamento_id,
         user_id,
         user_desconto,
         desconto,
         motivo
        });

        await historicoExameAsoExcluidaRepository.save(historicoExameAsoExcluidaService);
        return historicoExameAsoExcluidaService;
    }
}

export default CreatehistoricoExameAsoExcluidoService;
