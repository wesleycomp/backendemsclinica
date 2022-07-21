import { getCustomRepository } from "typeorm";
import Pacientes from "../typeorm/entities/Pacientes";
import PacientesRepository from "../typeorm/repositories/PacientesRepository";
import RedisCache from "@shared/cache/RedisCache";

class ListPacientesService{

    public async execute(): Promise<Pacientes[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacientesRepository = getCustomRepository(PacientesRepository);

        const redisCache = new RedisCache();

        let pacientes = await redisCache.recover<Pacientes[]>('api-emsclinica-PACIENTES_LIST', )

        if(!pacientes){

            pacientes = await pacientesRepository.find();

             await redisCache.save('api-emsclinica-PACIENTES_LIST', pacientes);

        }

        return pacientes;
    }
}

export default ListPacientesService;
