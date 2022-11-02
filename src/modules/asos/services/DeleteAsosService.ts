import { getCustomRepository } from "typeorm";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";

interface IRequest{
    id: string
}


class DeleteAsoService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asoRepository = getCustomRepository(AsosRepository);
        const aso = await asoRepository.findOne(id);

        if(!aso){
            throw new AppError('Aso não encontrada')
        }

        await asoRepository.remove(aso)

    }
}

export default DeleteAsoService;
