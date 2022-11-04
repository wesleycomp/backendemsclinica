import { Request , Response } from "express";
import CreateEmpresaService from "../services/CreateEmpresaService";
import DeleteEmpresaService from "../services/DeleteEmpresaService";
import ListEmpresaService from "../services/ListEmpresaService";
import ShowEmpresaService from "../services/ShowEmpresaService";
import UpdateEmpresaService from "../services/UpdateEmpresaService";

export default class EmpresaController{

    public async index(request: Request, response: Response): Promise<Response>{

        const listEmpresas = new ListEmpresaService();
        const Empresas = await listEmpresas.execute();

        return response.json(Empresas);
    }

    public async show(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const showEmpresas = new ShowEmpresaService();
        const empresa = await showEmpresas.execute({ id })

        return response.json(empresa);

    }

    public async create(request: Request, response: Response): Promise<Response>{

        const { nome, cnpj, cpf, ideEmpregador, inscricaoestadual, inscricaomunicipal,endereco,telefone,email,responsavel,esocial,convenio } = request.body;

        const createEmpresa = new CreateEmpresaService();

        const empresa = await createEmpresa.execute({
                    nome,
                    cnpj,
                    cpf,
                    ideEmpregador,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio
        });

        return response.json(empresa);
    }


  public async update(request: Request, response: Response): Promise<Response>{

        const {
               nome,
               cnpj,
               cpf,
               ideEmpregador,
               inscricaoestadual,
               inscricaomunicipal,
               endereco,
               telefone,
               email,
               responsavel,
               esocial,
               convenio } = request.body;

        const { id } = request.params;


        const updateEmpresa = new UpdateEmpresaService();

        const empresa = await updateEmpresa.execute({
                    id,
                    nome,
                    cnpj,
                    cpf,
                    ideEmpregador,
                    inscricaoestadual,
                    inscricaomunicipal,
                    endereco,
                    telefone,
                    email,
                    responsavel,
                    esocial,
                    convenio
        });

        return response.json(empresa);
    }

   public async delete(request: Request, response: Response): Promise<Response>{

        const { id } = request.params;
        const deleteEmpresa = new DeleteEmpresaService();
        await deleteEmpresa.execute({ id })

        return response.json([]);
    }

 }
