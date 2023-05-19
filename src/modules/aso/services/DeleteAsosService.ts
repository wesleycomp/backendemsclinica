import { getCustomRepository } from "typeorm";
import { AsosRepository } from "../typeorm/repositories/AsosRepository";

import AppError from '@shared/errors/AppError';
 import AlteracoesUsuariosRepository from "../typeorm/repositories/AlteracoesUsuariosRepository";

interface IRequest{
    id: string
}


class DeleteAsoService{

    public async execute({id}: IRequest): Promise<void>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const asoRepository = getCustomRepository(AsosRepository);
         const alteracoesUsuariosRepository = getCustomRepository(AlteracoesUsuariosRepository);
        const aso = await asoRepository.findOne(id);

        if(!aso){
            throw new AppError('Aso não encontrada')
        }

        const alteracoesUsuarios = alteracoesUsuariosRepository.create({

/*
         usuarioaso: aso.user_id,
         dataso: aso.created_at,
         antigaempresa:aso.empresa_id,
         antigopaciente:aso.paciente_id,
         tipoalteracao: 'exclusao'
*/
         usuarioaso: '52ee87b1-5398-4d5b-97e6-8c27d8c0abae',
         dataso: '2023-05-16 19:05:14.708542',
         antigaempresa:'empresateste',
         antigopaciente:'testepaciente',
         tipoalteracao: 'exclusao'

        });

        await asoRepository.save(alteracoesUsuarios);

        await asoRepository.remove(aso)

    }
}

export default DeleteAsoService;
