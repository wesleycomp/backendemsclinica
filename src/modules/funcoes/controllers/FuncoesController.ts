import { Request , Response } from "express";
import CreateFuncaoService from "../services/CreateFuncaoService";
import DeleteFuncaoService from "../services/DeleteFuncaoService";
import ListFuncaoService from "../services/ListFuncaoService";
import ShowFuncaoService from "../services/ShowFuncaoService";
import UpdateFuncaoService from "../services/UpdateFuncaoService";

export default class FuncoesController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listFuncoes = new ListFuncaoService();
        const funcoes = await listFuncoes.execute();

        return response.json(funcoes);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showFuncoes = new ShowFuncaoService();
        const funcao = await showFuncoes.execute({ id })

        return response.json(funcao);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const { name } = request.body;
        const createFuncao = new CreateFuncaoService();
        const funcao = await createFuncao.execute({
                name
        });

        return response.json(funcao);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const { name } = request.body;
        const { id } = request.params;
        const updateFuncao = new UpdateFuncaoService();
        
        const funcao = await updateFuncao.execute({
            id,
            name
        });

        return response.json(funcao);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteFuncao = new DeleteFuncaoService();
        await deleteFuncao.execute({ id })

        return response.json([]);
    }

 }
