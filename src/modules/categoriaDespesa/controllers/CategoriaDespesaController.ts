import { Request, Response } from 'express';
import CreateCategoriaDespesaService from '../services/CreateCategoriaDespesaService';
import ListCategoriaDespesaService from '../services/ListCategoriaDespesaService';
import ShowCategoriaDespesaService from '../services/ShowCategoriaDespesaService';
import UpdateCategoriaDespesaService from '../services/UpdateCategoriaDespesaService';
import DeleteCategoriaDespesaService from '../services/DeleteCategoriaDespesaService';

export default class CategoriaDespesaController {
  public async index(req: Request, res: Response): Promise<Response> {
    const service = new ListCategoriaDespesaService();
    const data = await service.execute();
    return res.json(data);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new ShowCategoriaDespesaService();
    const data = await service.execute({ id });
    return res.json(data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { nome, codigo, ativo } = req.body;
    const service = new CreateCategoriaDespesaService();
    const data = await service.execute({ nome, codigo, ativo });
    return res.json(data);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nome, codigo, ativo } = req.body;
    const service = new UpdateCategoriaDespesaService();
    const data = await service.execute({ id, nome, codigo, ativo });
    return res.json(data);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new DeleteCategoriaDespesaService();
    await service.execute({ id });
    return res.json([]);
  }
}
