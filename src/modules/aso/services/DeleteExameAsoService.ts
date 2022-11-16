import { getCustomRepository } from "typeorm";
import { ExamesAsoRepository } from "../typeorm/repositories/ExamesAsoRepository";

interface IRequest{
    id: string
}


class DeleteExameAsoService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const exameAsoRepository = getCustomRepository(ExamesAsoRepository);
        const exameAso = await exameAsoRepository.findOne(id);

        if(!exameAso){
            throw new AppError('Aso não encontrada')
        }

        await exameAsoRepository.remove(exameAso)

    }
}

export default DeleteExameAsoService;