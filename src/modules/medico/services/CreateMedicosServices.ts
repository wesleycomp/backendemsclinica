  import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import Medicos from '../typeorm/entities/Medico';
import {MedicosRepository}  from "../typeorm/repositories/MedicosRepository";

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

class CreateMedicosService{

    public async execute({nome, cpf, rg,crm, ufcrm, telefone, datanascimento,email,endereco }: IRequest): Promise<Medicos>{

        const medicosRepository = getCustomRepository(MedicosRepository);
        const emailExists = await medicosRepository.findByCpf(cpf);

        if(emailExists){
            throw new AppError('Medico ja Cadastrado');
        }

        const medico = medicosRepository.create({
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

        await medicosRepository.save(medico);
        return medico;
    }
}

export default CreateMedicosService;
