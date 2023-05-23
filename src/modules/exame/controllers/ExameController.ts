import { Request , Response } from "express";
import CreateExameService from "../services/CreateExameService";
import DeleteExameService from "../services/DeleteExameService";
import ListExameService from "../services/ListExameService";
import ShowExameService from "../services/ShowExameService";
import UpdateExameService from "../services/UpdateExameService";

export default class ExameController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listExame = new ListExameService();
        const exame = await listExame.execute();
        return response.json(exame);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showExame = new ShowExameService();
        const exame = await showExame.execute({ id })
        return response.json(exame);
    }

    public async create(request: Request, response: Response): Promise<Response>{

        const {procedimento_id,name,valoravista,valormedico,valorems,ativo,usuariocadastro,usuarioedicao } = request.body;
        const createExame = new CreateExameService();
        const exame = await createExame.execute({
                procedimento_id,
                name,
                valoravista,
                valormedico,
                valorems,
                ativo,
                usuariocadastro,
                usuarioedicao
        });

        return response.json(exame);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const { name,procedimento_id,valoravista,valormedico,valorems,ativo,usuarioedicao  } = request.body;
        const { id } = request.params;
        const updateExame = new UpdateExameService();

        const exame = await updateExame.execute({
                id,
                procedimento_id,
                name,
                valoravista,
                valormedico,
                valorems,
                ativo,
                usuarioedicao
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
