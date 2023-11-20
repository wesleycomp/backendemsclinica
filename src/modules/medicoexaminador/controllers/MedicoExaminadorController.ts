import { Request , Response } from "express";
import ListMedicosService from "../services/ListMedicoExaminadorServices";
import ShowMedicoExaminadorService from "../services/ShowMedicoExaminador";
import CreateMedicoExaminadorServices from "../services/CreateMedicoExaminadorServices"
import DeleteMedicoExaminadorServices from "../services/DeleteMedicoExaminadorServices";
import UpdateMedicosExaminadorServices from "../services/UpdateMedicosExaminadorServices";


export default class MedicoExaminadorController{

    public async index(request: Request, response: Response): Promise<Response>{

        const showMedicoExaminadorService = new ShowMedicoExaminadorService();
        const Medicos = await showMedicoExaminadorService.ListAllMedicoExaminadorOrder();
        return response.json(Medicos);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showMedicoExaminadorService = new ShowMedicoExaminadorService();
        const showMedicoExaminador = await showMedicoExaminadorService.execute({ id })

        return response.json(showMedicoExaminador);

    }
public async create(request: Request, response: Response): Promise<Response>{

        const { nome,cpf,rg,crm,ufcrm,telefone,datanascimento,endereco,email } = request.body;
        const createMedicos = new CreateMedicoExaminadorServices();
        const Medicos = await createMedicos.execute({
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

        return response.json(Medicos);
    }


  public async update(request: Request, response: Response): Promise<Response>{

   // console.log('testees');


        const { nome,cpf,rg,crm,ufcrm,telefone,datanascimento,endereco,email } = request.body;
        const { id } = request.params;
        const updateMedicos = new UpdateMedicosExaminadorServices();

        const Medicos = await updateMedicos.execute({
            id,
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

        return response.json(Medicos);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteMedicos = new DeleteMedicoExaminadorServices();
        await deleteMedicos.execute({ id })

        return response.json([]);
    }

 }


