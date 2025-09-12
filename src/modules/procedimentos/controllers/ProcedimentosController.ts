import { Request, Response } from "express";
import CreateEspecialidadeMedicaService from "../services/CreateEspecialidadeMedicaService";
import DeleteEspecialidadeMedicaService from "../services/DeleteProcedimentosService";
import ListEspecialidadeMedicaService from "../services/ListProcedimentosService";
import ShowEspecialidadeMedicaService from "../services/ShowProcedimentosService";
import UpdateEspecialidadeMedicaService from "../services/UpdateProcedimentosService";

export default class EspecialidadeMedicasController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listEspecialidadeMedicas = new ListEspecialidadeMedicaService();
    const especialidadeMedicas = await listEspecialidadeMedicas.execute();
    return response.json(especialidadeMedicas);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showEspecialidadeMedicas = new ShowEspecialidadeMedicaService();
    const EspecialidadeMedica = await showEspecialidadeMedicas.execute({ id });
    return response.json(EspecialidadeMedica);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, codigoEsocial } = request.body; // <-- ADICIONADO
    const createEspecialidadeMedica = new CreateEspecialidadeMedicaService();
    const especialidadeMedica = await createEspecialidadeMedica.execute({
      name,
      codigoEsocial, // <-- ADICIONADO
    });
    return response.json(especialidadeMedica);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, codigoEsocial } = request.body; // <-- ADICIONADO
    const updateEspecialidadeMedica = new UpdateEspecialidadeMedicaService();
    const EspecialidadeMedica = await updateEspecialidadeMedica.execute({
      id,
      name,
      codigoEsocial, // <-- ADICIONADO
    });
    return response.json(EspecialidadeMedica);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteEspecialidadeMedica = new DeleteEspecialidadeMedicaService();
    await deleteEspecialidadeMedica.execute({ id });
    return response.json([]);
  }
}
