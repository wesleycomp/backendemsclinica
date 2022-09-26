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

        const { id } = request.params;
        const showConvenioEmpresa = new ShowConvenioEmpresaService();
        const ConvenioEmpresa = await showConvenioEmpresa.execute({ id })

        return response.json(ConvenioEmpresa);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const { idempresa,
                idexame,
                valorexame,
                valormedico,
                valorems,
                ativo } = request.body;
        const createConvenioEmpresa = new CreateConvenioEmpresaService();
        const ConvenioEmpresa = await createConvenioEmpresa.execute({
                idempresa,
                idexame,
                valorexame,
                valormedico,
                valorems,
                ativo
        });

        return response.json(ConvenioEmpresa);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const {
                 idempresa,
                 idexame,
                 valorexame,
                 valormedico,
                 valorems,
                 ativo
                } = request.body;
        const { id } = request.params;

        const updateConvenioEmpresa = new UpdateConvenioEmpresaService();

        const ConvenioEmpresa = await updateConvenioEmpresa.execute({
            id,
            idexame,
            valorexame,
            valormedico,
            valorems,
            ativo
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
