import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Procedimentos from "../typeorm/entities/Procedimentos";
import { ProcedimentosRepository } from "../typeorm/repositories/ProcedimentosRepository";

interface IRequest{
    id: string;
    name: string;
    codigoEsocial: string;
}


class UpdateProcedimentosService{

    public async execute({id, name, codigoEsocial }: IRequest): Promise<Procedimentos>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const procedimentosRepository = getCustomRepository(ProcedimentosRepository);
        const Procedimentos = await procedimentosRepository.findOne(id);

        if(!Procedimentos){
            throw new AppError('Procedimento não encontrada')
        }


        const ProcedimentosExists= await procedimentosRepository.findByName(name)

        if(ProcedimentosExists && name != Procedimentos.name){

            throw new AppError('Procedimento ja existente')
        }

        Procedimentos.name = name;

        await procedimentosRepository.save(Procedimentos)

        return Procedimentos;
    }
}

export default UpdateProcedimentosService;
