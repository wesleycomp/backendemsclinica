import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Pacientes from "../typeorm/entities/Paciente";
import { PacientesRepository } from "../typeorm/repositories/PacientesRepository";


interface IRequest {

    id: string;
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

class UpdatePacienteService{

    public async execute({ id,
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

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const pacientesRepository = getCustomRepository(PacientesRepository);
        const paciente = await pacientesRepository.findOne(id);

        if(!paciente){
            throw new AppError('Paciente não encontrado.')
        }

        console.log('passou aki')

        paciente.empresa_id=empresa_id,
        paciente.funcao_id=funcao_id,
        paciente.categoriatrabalhador_id=categoriatrabalhador_id,
        paciente.matricula=matricula,
        paciente.dataentradaempresa=dataentradaempresa,
        paciente.descricaoatividade=descricaoatividade,

            paciente.nome = nome;
            paciente.cpf = cpf;
            paciente.rg = rg;
            paciente.telefone = telefone;

        paciente.genero=genero,
        paciente.tiposanguineo=tiposanguineo,
        paciente.nacionalidade_id=nacionalidade_id,
        paciente.nis=nis,
        paciente.ctps=ctps,

            paciente.datanascimento = datanascimento;
            paciente.endereco = endereco;
          paciente.email = email;


        console.log('passou aki 2')
            await pacientesRepository.save(paciente);

        console.log('passou ak3')
            return paciente;
    }
}

export default UpdatePacienteService;
