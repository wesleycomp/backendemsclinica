  import { getCustomRepository } from "typeorm";
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs'
import Pacientes from '../typeorm/entities/Paciente';
import {PacientesRepository}  from "../typeorm/repositories/PacientesRepository";

interface IRequest{

    empresa_id: string;
    funcao_id: string;
    categoriatrabalhador_id: string;
    matricula: string;
    dataentradaempresa: Date;
    descricaoatividade: string;

    nome: string;
    cpf: string;
    rg: string;
    telefone: string;

    genero: string;
    tiposanguineo: string;
    nacionalidade_id: string;
    nis: string;
    ctps: string;

    datanascimento: Date;
    endereco: string;
    email: string;

}

class CreatePacientesService{

    public async execute({
        empresa_id,
        funcao_id,
        categoriatrabalhador_id,
        matricula,
        dataentradaempresa,
        descricaoatividade,
        nome,
        cpf,
        rg,
        telefone,
        genero,
        tiposanguineo,
        nacionalidade_id,
        nis,
        ctps,
        datanascimento,
        endereco,
        email
    }: IRequest): Promise<Pacientes>{

        const pacientesRepository = getCustomRepository(PacientesRepository);
        const emailExists = await pacientesRepository.findByCpf(cpf);

        if(emailExists){

            throw new AppError('Paciente ja Cadastrado');

        }

        const paciente = pacientesRepository.create({
            empresa_id,
            funcao_id,
            categoriatrabalhador_id,
            matricula,
            dataentradaempresa,
            descricaoatividade,
            nome,
            cpf,
            rg,
            telefone,
            genero,
            tiposanguineo,
            nacionalidade_id,
            nis,
            ctps,
            datanascimento,
            endereco,
            email
        });

        await pacientesRepository.save(paciente);

console.log(paciente)

        return paciente;
    }
}

export default CreatePacientesService;
