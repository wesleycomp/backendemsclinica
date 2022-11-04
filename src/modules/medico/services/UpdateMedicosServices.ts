import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Medicos from "../typeorm/entities/Medico";
import { MedicosRepository } from "../typeorm/repositories/MedicosRepository";


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
                             }: IRequest): Promise<Medicos>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicosRepository = getCustomRepository(MedicosRepository);
        const paciente = await medicosRepository.findById(id);

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
            await medicosRepository.save(paciente);

            return paciente;
    }
}

export default UpdateProfileService;
