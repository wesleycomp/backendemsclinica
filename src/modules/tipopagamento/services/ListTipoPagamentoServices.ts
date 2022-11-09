import { getCustomRepository } from "typeorm";
import TipoPagamento from "../typeorm/entities/TipoPagamento";
import TipoPagamentoRepository from "../typeorm/repositories/TipoPagamentoRepository";
import RedisCache from "@shared/cache/RedisCache";


// interface IPaginationPacientes{

//     from: number;
//     to: number;
//     per_page: number;
//     total: number;
//     current_page: number;
//     prev_page: number | null;
//     next_page: number | null;
//     last_page: number | null;
//     data: Pacientes[];

// }


class ListTipoPagamentoesService{

    public async execute(): Promise<TipoPagamento[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacientesRepository = getCustomRepository(TipoPagamentoRepository);

        // const redisCache = new RedisCache();

        // let pacientes = await redisCache.recover<Pacientes[]>('api-emsclinica-PACIENTES_LIST', )

       // if(!pacientes){

        // pacientes = await pacientesRepository.find();

        //     await redisCache.save('api-emsclinica-PACIENTES_LIST', pacientes);

       // }
          //   return pacientes;

     //   const pacientes = await pacientesRepository.createQueryBuilder().paginate();

     //   return pacientes as IPaginationPacientes;


         const pacientes = await pacientesRepository.find();
        return pacientes;

    }
}

export default ListTipoPagamentoesService;
