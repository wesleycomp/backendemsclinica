import { getCustomRepository } from "typeorm";
import AsosExcluidas from "../typeorm/entities/AsosExcluidas";
import { AsosExcluidasRepository } from "../typeorm/repositories/AsosExcluidasRepository";


interface IExclusaoAso{
    aso_id: string;
    user_id: string;
    motivo: string;
}

class CreateAsosExcluidasServices{

    public async execute({aso_id,user_id,motivo}: IExclusaoAso): Promise<AsosExcluidas>{

        //instaciou o repositorio para ter acesso aos metodos(save, delete... etc)
       const asosExcluidasRepository = getCustomRepository(AsosExcluidasRepository);
        const exclusaoExameAso = asosExcluidasRepository.create({
           aso_id,
           user_id,
           motivo

        });

        await asosExcluidasRepository.save(exclusaoExameAso);
        return exclusaoExameAso;
    }
}

export default CreateAsosExcluidasServices;
