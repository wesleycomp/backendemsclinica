import { getCustomRepository } from "typeorm";
import Pacientes from "../typeorm/entities/Paciente";
import PacientesRepository from "../typeorm/repositories/PacientesRepository";
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


class ListPacientesService{


    public async execute(): Promise<Pacientes[]>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacientesRepository = getCustomRepository(PacientesRepository);

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


             //   (pacientes).forEach(function(item){

                //console.log(item.datanascimento.toLocaleDateString('pt-BR', {timeZone: 'UTC'}))

               //  item.datanascimento=item.datanascimento.toLocaleDateString('pt-BR', {timeZone: 'UTC'})

                  //item.datanascimento =  new Date(item.datanascimento)

                 // item.datanascimento = new Date(item.datanascimento).toLocaleDateString('en-GB');

                //    console.log(item.datanascimento)

             //   })



        return pacientes;

    }
}

export default ListPacientesService;
