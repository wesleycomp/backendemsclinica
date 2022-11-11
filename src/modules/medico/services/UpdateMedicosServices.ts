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
    crm  : string;
    ufcrm: string;
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
                            crm,
                            ufcrm,
                            telefone,
                            datanascimento,
                            endereco,
                            email
                             }: IRequest): Promise<Medicos>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicosRepository = getCustomRepository(MedicosRepository);
        const medico = await medicosRepository.findById(id);

        if(!medico){
            throw new AppError('medico not found.')
        }

            medico.nome = nome;
            medico.cpf = cpf;
            medico.rg = rg;
            medico.crm = crm;
            medico.ufcrm = ufcrm;
            medico.telefone = telefone;
            medico.datanascimento = datanascimento;
            medico.endereco = endereco;
            medico.email = email;
            await medicosRepository.save(medico);

            return medico;
    }
}

export default UpdateProfileService;
