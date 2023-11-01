import { getCustomRepository } from "typeorm";
import Aso from "../typeorm/entities/Aso";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";
import AppError from '@shared/errors/AppError';
import HistoricoAsoExcluida from "../typeorm/entities/HistoricoAsoExcluida";
import HistoricoAsosExcluidasRepository from "../typeorm/repositories/HistoricoAsosExcluidasRepository";

interface IRequest{
    id: string
}


interface IRequestASO{
    aso_id: string
}
class ShowAsosService{

    public async execute({id}: IRequest): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findById(id);

        if(!aso){
            throw new AppError('Exame de Aso não encontrado')
        }

        return aso;

    }


        public async findAso({aso_id}: IRequestASO): Promise<Aso>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asosRepository = getCustomRepository(AsosRepository);
        const aso = await asosRepository.findById(aso_id);

        if(!aso){
            throw new AppError('Exame de Aso não encontrado')
        }

        return aso;

    }

    public async listAsosCriadas(): Promise<Aso[]>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
          const asosCriadasRepository = getCustomRepository(AsosRepository);
          const asosCriadas = await asosCriadasRepository.findHistoricoAsosCriadas();

        if(!asosCriadas){
            throw new AppError('Aso não encontrado')
        }

        return asosCriadas;
    }
    public async listAsosExcluidas(): Promise<HistoricoAsoExcluida[]>{
          //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
          const asosExcluidasRepository = getCustomRepository(HistoricoAsosExcluidasRepository);
          const asosExcluidas = await asosExcluidasRepository.findHistoricoAsosExcluidas();

        if(!asosExcluidas){
            throw new AppError('Aso não encontrado')
        }

        return asosExcluidas;
    }



}

export default ShowAsosService;
