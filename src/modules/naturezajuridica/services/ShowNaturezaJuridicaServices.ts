import { getCustomRepository } from "typeorm";
import NaturezaJuridica from "../typeorm/entities/NaturezaJuridica";
import { NacionaliadeRepository } from "../typeorm/repositories/NaturezaJuridicaRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowNaturezaJuridicaService{

    public async execute({id}: IRequest): Promise<NaturezaJuridica>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const NaturezaJuridicaRepository = getCustomRepository(NacionaliadeRepository);
        const paciente = await NaturezaJuridicaRepository.findOne(id);

        if(!paciente){
            throw new AppError('Natureza Juridica não encontrado')
        }

        return paciente;
    }
}

export default ShowNaturezaJuridicaService;
