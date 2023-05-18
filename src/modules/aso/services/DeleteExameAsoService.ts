import { getCustomRepository } from "typeorm";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';
import AsosRepository from "../typeorm/repositories/AsosRepository";
interface IRequest{
    id: string
}


class DeleteExameAsoService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
       // const asoRepository = getCustomRepository(AsosRepository);
        const exameAso = await exameAsoRepository.findExamesAso(id);
       // const aso = await asoRepository.findOne(id)

        if(!exameAso){
            throw new AppError('ExameAso não encontrada')
        }

        await exameAsoRepository.remove(exameAso)
       // await asoRepository.remove(aso)

    }


    //   public async executeRemoveAso({id}: IRequest): Promise<void>{

    //     //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
    //     const asoRepository = getCustomRepository(AsosRepository);

    //     const aso = await asoRepository.findOne(id)

    //     if(!aso){
    //         throw new AppError('Aso não encontrada')
    //     }

    //     await asoRepository.remove(aso)

    // }
}

export default DeleteExameAsoService;
