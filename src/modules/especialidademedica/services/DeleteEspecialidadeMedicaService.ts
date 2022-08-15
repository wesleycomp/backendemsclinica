import { getCustomRepository } from "typeorm";
import { EspecialidadeMedicaRepository } from "../typeorm/repositories/EspecialidadeMedicaRepository";

interface IRequest{
    id: string
}


class DeleteEspecialidadeMedicaService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const especialidadeMedicaRepository = getCustomRepository(EspecialidadeMedicaRepository);
        const EspecialidadeMedica = await especialidadeMedicaRepository.findOne(id);

        if(!EspecialidadeMedica){
            throw new AppError('Função não encontrada')
        }

        await especialidadeMedicaRepository.remove(EspecialidadeMedica)

    }
}

export default DeleteEspecialidadeMedicaService;
