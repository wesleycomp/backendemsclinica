import { Request , Response } from "express";
import CreateFornecedorService from "../services/CreateFornecedoresService";
import DeleteFornecedorService from "../services/DeleteFornecedoresService";
import ListFornecedorService from "../services/ListFornecedoresService";
import ShowFornecedorService from "../services/ShowFornecedoresService";
import UpdateFornecedorService from "../services/UpdateFornecedoresService";

export default class FornecedorController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listFornecedors = new ListFornecedorService();
        const Fornecedors = await listFornecedors.execute();

        return response.json(Fornecedors);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showFornecedors = new ShowFornecedorService();
        const Fornecedor = await showFornecedors.execute({ id })

        return response.json(Fornecedor);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const { nome, cnpj, inscricaoestadual, inscricaomunicipal,endereco,telefone,email,responsavel,esocial,convenio } = request.body;

        const createFornecedor = new CreateFornecedorService();

        const Fornecedor = await createFornecedor.execute({
                    nome,
                    cnpj,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio
        });

        return response.json(Fornecedor);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const {
               nome,
               cnpj,
               inscricaoestadual,
               inscricaomunicipal,
               endereco,
               telefone,
               email,
               responsavel,
               esocial,
               convenio } = request.body;

        const { id } = request.params;


        const updateFornecedor = new UpdateFornecedorService();

        const Fornecedor = await updateFornecedor.execute({
                    id,
                    nome,
                    cnpj,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio
        });

        return response.json(Fornecedor);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteFornecedor = new DeleteFornecedorService();
        await deleteFornecedor.execute({ id })

        return response.json([]);
    }

 }
