import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Pacientes from "../typeorm/entities/Pacientes";
import { PacientesRepository } from "../typeorm/repositories/PacientesRepository";


interface IRequest {
    
    id: string;
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    datanascimento: Date;
    endereco: string;
    email: string;

}

class UpdateProfileService{

    public async execute({ id,
                            nome,
                            cpf,
                            rg,
                            telefone,
                            datanascimento,
                            endereco,
                            email
                             }: IRequest): Promise<Pacientes>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacientesRepository = getCustomRepository(PacientesRepository);
        const paciente = await pacientesRepository.findById(id);

        if(!paciente){
            throw new AppError('Paciente not found.')
        }

            paciente.nome = nome;
            paciente.cpf = cpf;
            paciente.rg = rg;
            paciente.telefone = telefone;
            paciente.datanascimento = datanascimento;
            paciente.endereco = endereco;
            paciente.email = email;
            await pacientesRepository.save(paciente);

            return paciente;
    }
}

export default UpdateProfileService;
