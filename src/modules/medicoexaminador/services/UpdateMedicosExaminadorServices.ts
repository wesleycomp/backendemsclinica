import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import MedicoExaminador from "../typeorm/entities/MedicoExaminador";
import { MedicoExaminadorRepository } from "../typeorm/repositories/MedicoExaminadorRepository";


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

class UpdateMedicosExaminadorServices{

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
                             }: IRequest): Promise<MedicoExaminador>{

         //instaciou o repositorio para ter acesso aos metodos(save, delete, find... etc)
        const medicosRepository = getCustomRepository(MedicoExaminadorRepository);
        const medicoExaminador = await medicosRepository.findById(id);

        if(!medicoExaminador){
            throw new AppError('medico not found.')
        }

            medicoExaminador.nome = nome;
            medicoExaminador.cpf = cpf;
            medicoExaminador.rg = rg;
            medicoExaminador.crm = crm;
            medicoExaminador.ufcrm = ufcrm;
            medicoExaminador.telefone = telefone;
            medicoExaminador.datanascimento = datanascimento;
            medicoExaminador.endereco = endereco;
            medicoExaminador.email = email;
            await medicosRepository.save(medicoExaminador);

            return medicoExaminador;
    }
}

export default UpdateMedicosExaminadorServices;
