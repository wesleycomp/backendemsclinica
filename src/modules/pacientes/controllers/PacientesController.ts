import { Request , Response } from "express";
import CreatePacientesService from "../services/CreatePacientesServices";
import DeletePacientesService from "../services/DeletePacientesServices";
import ListPacientesService from "../services/ListPacientesServices";
import ShowPacientesService from "../services/ShowPacientesServices";
import UpdatePacientesService from "../services/UpdatePacientesServices";

export default class PacientesController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listPacientes = new ListPacientesService();
        const pacientes = await listPacientes.execute();

        return response.json(pacientes);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showPacientes = new ShowPacientesService();
        const pacientes = await showPacientes.execute({ id })

        return response.json(pacientes);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const { nome,cpf,rg,telefone,datanascimento } = request.body;
        const createPacientes = new CreatePacientesService();
        const pacientes = await createPacientes.execute({
                nome,
                cpf,
                rg,
                telefone,
                datanascimento
        });

        return response.json(pacientes);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const { nome,cpf,rg,telefone,datanascimento } = request.body;
        const { id } = request.params;
        const updatePacientes = new UpdatePacientesService();

        const pacientes = await updatePacientes.execute({
            id,
            nome,
            cpf,
            rg,
            telefone,
            datanascimento
        });

        return response.json(pacientes);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deletePacientes = new DeletePacientesService();
        await deletePacientes.execute({ id })

        return response.json([]);
    }

 }
