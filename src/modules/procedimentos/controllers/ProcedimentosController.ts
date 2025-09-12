import { Request, Response } from 'express';

import ListProcedimentosService from '../services/ListProcedimentosService';
import ShowProcedimentosService from '../services/ShowProcedimentosService';
import CreateEspecialidadeMedicaService from '../services/CreateEspecialidadeMedicaService';
import UpdateProcedimentosService from '../services/UpdateProcedimentosService';
import DeleteProcedimentosService from '../services/DeleteProcedimentosService';

export default class ProcedimentosController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProcedimentos = new ListProcedimentosService();
    const procedimentos = await listProcedimentos.execute();
    return response.json(procedimentos);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProcedimento = new ShowProcedimentosService();
    const procedimento = await showProcedimento.execute({ id });

    return response.json(procedimento);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, codigoEsocial } = request.body;

    const createProcedimento = new CreateEspecialidadeMedicaService();
    const procedimento = await createProcedimento.execute({
      name,
      codigoEsocial, // camelCase para o service; a coluna é "codigoesocial"
    });

    return response.json(procedimento);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, codigoEsocial } = request.body;

    const updateProcedimento = new UpdateProcedimentosService();
    const procedimento = await updateProcedimento.execute({
      id,
      name,
      codigoEsocial,
    });

    return response.json(procedimento);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProcedimento = new DeleteProcedimentosService();
    await deleteProcedimento.execute({ id });

    return response.status(204).send();
  }
}

