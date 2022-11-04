import { Request , Response } from "express";
import CreateMedicosService from "../services/CreateMedicosServices";
import DeleteMedicosService from "../services/DeleteMedicosServices";
import ListMedicosService from "../services/ListMedicosServices";
import ShowMedicosService from "../services/ShowMedicosServices";
import UpdateMedicosService from "../services/UpdateMedicosServices";

export default class MedicosController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listMedicos = new ListMedicosService();
        const Medicos = await listMedicos.execute();
        return response.json(Medicos);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showMedicos = new ShowMedicosService();
        const Medicos = await showMedicos.execute({ id })

        return response.json(Medicos);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const { nome,cpf,rg,telefone,datanascimento,endereco,email } = request.body;
        const createMedicos = new CreateMedicosService();
        const Medicos = await createMedicos.execute({
                nome,
                cpf,
                rg,
                telefone,
                datanascimento,
                endereco,
                email
        });

        return response.json(Medicos);
    }


  public async update(request: Request, response: Response): Promise<Response>{

   // console.log('testees');


        const { nome,cpf,rg,telefone,datanascimento,endereco,email } = request.body;
        const { id } = request.params;
        const updateMedicos = new UpdateMedicosService();

        const Medicos = await updateMedicos.execute({
            id,
            nome,
            cpf,
            rg,
            telefone,
            datanascimento,
            endereco,
            email
        });

        return response.json(Medicos);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteMedicos = new DeleteMedicosService();
        await deleteMedicos.execute({ id })

        return response.json([]);
    }

 }
