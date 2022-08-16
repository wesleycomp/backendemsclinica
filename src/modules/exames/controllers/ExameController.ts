import { Request , Response } from "express";
import CreateExameService from "../services/CreateExameService";
import DeleteExameService from "../services/DeleteExameService";
import ListExameService from "../services/ListExameService";
import ShowExameService from "../services/ShowExameService";
import UpdateExameService from "../services/UpdateExameService";

export default class ExameController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listExame = new ListExameService();
        const Exame = await listExame.execute();

        return response.json(Exame);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showExame = new ShowExameService();
        const Exame = await showExame.execute({ id })

        return response.json(Exame);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const { name,valoravista,valormedico,valorems,ativo } = request.body;
        const { especialidademedica_id } = request.params;
        const createExame = new CreateExameService();
        const exame = await createExame.execute({
                especialidademedica_id,
                name,
                valoravista,
                valormedico,
                valorems,
                ativo
        });

        return response.json(exame);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const { name,valoravista,valormedico,valorems,ativo,especialidademedica_id  } = request.body;
        const { id } = request.params;
        const updateExame = new UpdateExameService();

        const exame = await updateExame.execute({
                id,
                especialidademedica_id,
                name,
                valoravista,
                valormedico,
                valorems,
                ativo
        });

        return response.json(exame);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteExame = new DeleteExameService();
        await deleteExame.execute({ id })

        return response.json([]);
    }

 }
