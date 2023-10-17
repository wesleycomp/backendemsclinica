import { getCustomRepository } from "typeorm";
import HistoricoExclusaoExameAso from "../typeorm/entities/HistoricoExclusaoExameAso";
import { HistoricoExclusaoExameAsoRepository } from "../typeorm/repositories/HistoricoExclusaoExameAsoRepository";
import AppError from '@shared/errors/AppError';


interface IHistoricoExclusaoExameAso{

    aso_id: string;
    exame_id: string;
    tipopagamento_id: string;
    paciente_id: string;
    empresa_id: string;
    funcao_id: string;
    usuario_id: string;
    data_exclusao:Date;

}

class CreateHistoricoExclusaoExameAso{

    public async execute({aso_id,exame_id,tipopagamento_id,empresa_id,funcao_id,paciente_id,usuario_id,data_exclusao}: IHistoricoExclusaoExameAso): Promise<HistoricoExclusaoExameAso>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const hostoricoExclusaoExameAsoRepository = getCustomRepository(HistoricoExclusaoExameAsoRepository);
        const historicoExclusaoExameAso = hostoricoExclusaoExameAsoRepository.create({
           aso_id,
           exame_id,
           tipopagamento_id,
           paciente_id,
           empresa_id,
           funcao_id,
           usuario_id,
           data_exclusao
        });

        await hostoricoExclusaoExameAsoRepository.save(historicoExclusaoExameAso);
        return historicoExclusaoExameAso;
    }
}

export default CreateHistoricoExclusaoExameAso;
