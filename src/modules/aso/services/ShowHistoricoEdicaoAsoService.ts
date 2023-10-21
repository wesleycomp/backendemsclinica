import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
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
