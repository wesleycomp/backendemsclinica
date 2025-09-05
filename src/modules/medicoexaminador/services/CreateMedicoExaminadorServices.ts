  import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import MedicoExaminador from '../typeorm/entities/MedicoExaminador';
import {MedicoExaminadorRepository}  from "../typeorm/repositories/MedicoExaminadorRepository";

interface IRequest{
    nome: string;
    cpf: string;
    rg: string;
    crm: string;
    ufcrm: string;
    telefone: string;
    datanascimento: Date;
    endereco: string;
    email: string;
}

class CreateMedicoExaminadorServices{

    public async execute({nome, cpf, rg,crm, ufcrm, telefone, datanascimento,email,endereco }: IRequest): Promise<MedicoExaminador>{

        const medicoExaminadorRepository  = getCustomRepository(MedicoExaminadorRepository);
        const medicoExaminadorExists = await medicoExaminadorRepository.findByCpf(cpf);

        if(medicoExaminadorExists){
            throw new AppError('Medico examinador ja Cadastrado');
        }

        const medicoExaminador = medicoExaminadorRepository.create({
            nome,
            cpf,
            rg,
            crm,
            ufcrm,
            telefone,
            datanascimento,
            endereco,
            email
        });

        await medicoExaminadorRepository.save(medicoExaminador);
        return medicoExaminador;
    }
}

export default CreateMedicoExaminadorServices;
