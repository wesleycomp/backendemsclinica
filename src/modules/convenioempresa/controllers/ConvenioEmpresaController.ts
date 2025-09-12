import { Request , Response } from "express";
import CreateConvenioEmpresaService from "../services/CreateConvenioEmpresaService";
import DeleteConvenioEmpresaService from "../services/DeleteConvenioEmpresaService";
import ListConvenioEmpresaService from "../services/ListConvenioEmpresaService";
import ShowConvenioEmpresaService from "../services/ShowConvenioEmpresaService";
import UpdateConvenioEmpresaService from "../services/UpdateConvenioEmpresaService";

export default class ConvenioEmpresaController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listConvenioEmpresa = new ListConvenioEmpresaService();
        const ConvenioEmpresa = await listConvenioEmpresa.execute();
        return response.json(ConvenioEmpresa);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { empresa_id } = request.params;
        const showConvenioEmpresa = new ShowConvenioEmpresaService();
        const ConvenioEmpresa = await showConvenioEmpresa.execute({ empresa_id })
        return response.json(ConvenioEmpresa);
    }

    public async create(request: Request, response: Response): Promise<Response>{

        const {
                empresa_id,
                exame_id,
                valorexame,
                valormedico,
                valorems,
                ativo,
                user_id
               } = request.body;

        const createConvenioEmpresa = new CreateConvenioEmpresaService();
        const ConvenioEmpresa = await createConvenioEmpresa.execute({
                empresa_id,
                exame_id,
                valorexame,
                valormedico,
                valorems,
                ativo,
                user_id
        });

        return response.json(ConvenioEmpresa);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const {
                 empresa_id,
                 exame_id,
                 valorexame,
                 valormedico,
                 valorems,
                 ativo,
                 user_id
                } = request.body;
        const { id } = request.params;

        const updateConvenioEmpresa = new UpdateConvenioEmpresaService();

        const ConvenioEmpresa = await updateConvenioEmpresa.execute({
            id,
            empresa_id,
            exame_id,
            valorexame,
            valormedico,
            valorems,
            ativo,
            user_id
        });

        return response.json(ConvenioEmpresa);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteConvenioEmpresa = new DeleteConvenioEmpresaService();
        await deleteConvenioEmpresa.execute({ id })
        return response.json([]);
    }

 }
