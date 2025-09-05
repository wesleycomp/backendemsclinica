import { getCustomRepository } from "typeorm";
import {HistoricoAsosExcluidasRepository} from "../typeorm/repositories/HistoricoAsosExcluidasRepository";
import HistoricoAsoExcluida from "../typeorm/entities/HistoricoAsoExcluida";
import AppError from '@shared/errors/AppError';

interface IHistoricoAsoExcluida{
         aso_id:string;
         dataemissaoaso:Date,
         paciente_id:string,
         empresa_id:string,
         funcao_id:string,
         tipoaso_id:string,
         medico_id:string,
         medicoexaminador_id:string,
         resultado:string,
         transmissaoesocial:boolean,
         ativo:boolean,
         created_at:Date,
         updated_at:Date,
         user_id:string,
         user_edit:string,
         codigoaso:Number,
         tipopagamento_id:string,
         data_criacao:string,
         user_exclusao:string,
         motivo:string,

}

class CreateHistoricoAsoExcluidaService{

    public async execute({aso_id,dataemissaoaso,paciente_id,empresa_id,funcao_id,tipoaso_id,medico_id,medicoexaminador_id,resultado,transmissaoesocial,ativo,created_at,updated_at,user_id,user_edit,codigoaso,tipopagamento_id,data_criacao,user_exclusao,motivo}: IHistoricoAsoExcluida): Promise<HistoricoAsoExcluida>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const historicoAsoExcluidaRepository = getCustomRepository(HistoricoAsosExcluidasRepository);
    const historicoAsoExcluidaService = historicoAsoExcluidaRepository.create({
        aso_id,
         dataemissaoaso,
         paciente_id,
         empresa_id,
         funcao_id,
         tipoaso_id,
         medico_id,
         medicoexaminador_id,
         resultado,
         transmissaoesocial,
         ativo,
         created_at,
         updated_at,
         user_id,
         user_edit,
         codigoaso,
         tipopagamento_id,
         data_criacao,
         user_exclusao,
         motivo

        });

        await historicoAsoExcluidaRepository.save(historicoAsoExcluidaService);
        return historicoAsoExcluidaService;
    }
}

export default CreateHistoricoAsoExcluidaService;
