import { getCustomRepository } from "typeorm";
import Pacientes from "../typeorm/entities/Paciente";
import { PacientesRepository } from "../typeorm/repositories/PacientesRepository";
import AppError from '@shared/errors/AppError';

    interface IRequest{
        id: string
    }

class ShowPacientesService{

    public async execute({id}: IRequest): Promise<Pacientes>{

       //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacienteRepository = getCustomRepository(PacientesRepository);
        const paciente = await pacienteRepository.findById(id);

        if(!paciente){
            throw new AppError('Paciente não encontrado')
        }

        return paciente;
    }

   public async executePacienteNome({id}: IRequest): Promise<Pacientes[]>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
                const pacienteRepository = getCustomRepository(PacientesRepository);
                const paciente = await pacienteRepository.findByName(id);

                    if(!paciente){
                        throw new AppError('Paciente não encontrada')
                    }
            return paciente;
        }

     public async executePacienteCpf({id}: IRequest): Promise<Pacientes[]>{

            //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
                const pacienteRepository = getCustomRepository(PacientesRepository);
                const paciente = await pacienteRepository.pesquisaByCpf(id);

                    if(!paciente){
                        throw new AppError('Paciente não encontrada')
                    }
            return paciente;
        }

}

export default ShowPacientesService;
