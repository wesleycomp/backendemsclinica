import { getCustomRepository } from "typeorm";
import ExamesAso from "../typeorm/entities/ExamesAso";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';
import HistoricoAsoExcluida from "../typeorm/entities/HistoricoAsoExcluida";
import HistoricoExclusaoExameAsoRepository from "../typeorm/repositories/HistoricoExclusaoExameAsoRepository";
import HistoricoExclusaoExameAso from "../typeorm/entities/HistoricoExclusaoExameAso";
import HistoricoEdicaoAso from "../typeorm/entities/HistoricoEdicaoAso";
import HistoricoAsosEditadasRepository from "../typeorm/repositories/HistoricoAsosEditadasRepository";


class ShowHistoricoEdicaoAsoService{

    public async execute(): Promise<HistoricoEdicaoAso[]>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
          const asosEditadasRepository = getCustomRepository(HistoricoAsosEditadasRepository);
        const asosEditadas = await asosEditadasRepository.findHistoricoAsosEditadas();

        if(!asosEditadas){
            throw new AppError('Aso não encontrado')
        }

        return asosEditadas;
    }














}
export default ShowHistoricoEdicaoAsoService;
