import { getCustomRepository } from "typeorm";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";
import AppError from '@shared/errors/AppError';

interface IRequest{
    id: string
}

class DeleteExameAsoService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
        const exameAso = await exameAsoRepository.findOne(id);

        if(!exameAso){
            throw new AppError('ExameAso não encontrada')
        }

        await exameAsoRepository.remove(exameAso)
    }


     public async deleteExameAso({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
        const aso_id = id;
        const exameAso = await exameAsoRepository.findExamesAso(aso_id);

        if(!exameAso){
            throw new AppError('ExameAso não encontrada')
        }
        else{

          await exameAso.forEach((item) => {
                var id: string = item.id;
                this.execute({id});
            })

        }
      //  await exameAsoRepository.remove(exameAso)
    }



    public async deleteHistoricoAsosEditadas({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
     //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
        const exameAso = await exameAsoRepository.findOne(id);

        if(!exameAso){
            throw new AppError('ExameAso não encontrada')
        }

        await exameAsoRepository.remove(exameAso)
      //  await exameAsoRepository.remove(exameAso)
    }

}

export default DeleteExameAsoService;
