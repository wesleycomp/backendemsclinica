  import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import Pacientes from '../typeorm/entities/Pacientes';
import {PacientesRepository}  from "../typeorm/repositories/PacientesRepository";

interface IRequest{
    
    nome: string;
    cpf: string;
    rg: string;
    telefone: string;
    datanascimento: Date;
    endereco: string;
    email: string;

}

class CreatePacientesService{

    public async execute({nome, cpf, rg, telefone, datanascimento,email,endereco }: IRequest): Promise<Pacientes>{

        const pacientesRepository = getCustomRepository(PacientesRepository);
        const emailExists = await pacientesRepository.findByCpf(cpf);

        if(emailExists){

            throw new AppError('Paciente ja Cadastrado');

        }

        const paciente = pacientesRepository.create({
            nome,
            cpf,
            rg,
            telefone,
            datanascimento,
            endereco,
            email
        });

        await pacientesRepository.save(paciente);
        return paciente;
    }
}

export default CreatePacientesService;
