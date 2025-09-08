import { getCustomRepository } from "typeorm";
import Procedimentos from "../typeorm/entities/Procedimentos";
import { ProcedimentosRepository } from "../typeorm/repositories/ProcedimentosRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    name: string;
    codigoEsocial: string;
}

class CreateProcedimentosService{

    public async execute({name,codigoEsocial}: IRequest): Promise<Procedimentos>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
    const procedimentosRepository = getCustomRepository(ProcedimentosRepository);

        const ProcedimentosExists= await procedimentosRepository.findByName(name)

        if(ProcedimentosExists){

            throw new AppError('Procedimentos ja existente')

        }

        const Procedimentos = procedimentosRepository.create({
            name,
            codigoEsocial
        });

        await procedimentosRepository.save(Procedimentos)

        return Procedimentos;

    }
}

export default CreateProcedimentosService;
