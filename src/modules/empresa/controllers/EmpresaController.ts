import { Request, Response } from "express";
import CreateEmpresaService from "../services/CreateEmpresaService";
import DeleteEmpresaService from "../services/DeleteEmpresaService";
import ListEmpresaService from "../services/ListEmpresaService";
import ShowEmpresaService from "../services/ShowEmpresaService";
import UpdateEmpresaService from "../services/UpdateEmpresaService";
import SearchEmpresaService from "../services/SearchEmpresaService";
import ListFechamentoEmpresasService from "../services/ListFechamentoEmpresasService";
import ListExamesPorEmpresaService from '../services/ListExamesPorEmpresaService'

export default class EmpresaController {

  // 🔎 Pesquisa por nome/cnpj (autocomplete)
  public async search(request: Request, response: Response): Promise<Response> {
    const { search } = request.query;
    const searchEmpresa = new SearchEmpresaService();
    const empresas = await searchEmpresa.execute({
      search: search ? String(search) : undefined,
    });
    return response.json(empresas);
  }

  public async listarExames(request: Request, response: Response): Promise<Response> {
  const { id } = request.params
  const { data_inicial, data_final } = request.query

  const service = new ListExamesPorEmpresaService()
  const exames = await service.execute({
    empresa_id: String(id),
    data_inicial: String(data_inicial),
    data_final: String(data_final),
  })

  return response.json(exames)
}

  // 📊 Agrupamento de exames por empresa (fechamento)
public async listarAgrupado(request: Request, response: Response): Promise<Response> {
  const { data_inicial, data_final, empresa_id } = request.query

  const service = new ListFechamentoEmpresasService()
  const result = await service.execute({
    data_inicial: String(data_inicial),
    data_final: String(data_final),
    empresa_id: empresa_id ? String(empresa_id) : undefined
  })

  return response.json(result)
}

  // 📋 Lista todas as empresas (sem filtro)
  public async index(request: Request, response: Response): Promise<Response> {
    const listEmpresas = new ListEmpresaService();
    const empresas = await listEmpresas.execute();
    return response.json(empresas);
  }

  // 🔍 Busca empresa por ID
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showEmpresas = new ShowEmpresaService();
    const empresa = await showEmpresas.execute({ id });
    return response.json(empresa);
  }

  // 🔍 Busca empresa por ID (método alternativo)
  public async showEmpresaId(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showEmpresas = new ShowEmpresaService();
    const empresa = await showEmpresas.executePesquisaEmpresaId({ id });
    return response.json(empresa);
  }

  // 🔍 Busca empresa por Nome
  public async showEmpresaNome(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showEmpresas = new ShowEmpresaService();
    const empresa = await showEmpresas.executeEmpresaNome({ id });
    return response.json(empresa);
  }

  // 🔍 Busca empresa por CNPJ
  public async showEmpresaCnpj(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showEmpresas = new ShowEmpresaService();
    const empresa = await showEmpresas.executeEmpresaCnpj({ id });
    return response.json(empresa);
  }

  // ➕ Criação
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    } = request.body;

    const createEmpresa = new CreateEmpresaService();

    const empresa = await createEmpresa.execute({
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    });

    return response.json(empresa);
  }

  // ✏️ Atualização
  public async update(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    } = request.body;

    const { id } = request.params;

    const updateEmpresa = new UpdateEmpresaService();

    const empresa = await updateEmpresa.execute({
      id,
      nome,
      cnpj,
      cpf,
      inscricaoestadual,
      inscricaomunicipal,
      endereco,
      telefone,
      email,
      responsavel,
      esocial,
      convenio,
      observacao,
      empresafora
    });

    return response.json(empresa);
  }

  // 🗑️ Exclusão
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteEmpresa = new DeleteEmpresaService();
    await deleteEmpresa.execute({ id });
    return response.json([]);
  }
}
