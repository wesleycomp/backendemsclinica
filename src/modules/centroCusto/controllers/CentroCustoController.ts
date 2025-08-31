import { Request, Response } from 'express';
import CreateCentroCustoService from '../services/CreateCentroCustoService';
import ListCentroCustoService from '../services/ListCentroCustoService';
import ShowCentroCustoService from '../services/ShowCentroCustoService';
import UpdateCentroCustoService from '../services/UpdateCentroCustoService';
import DeleteCentroCustoService from '../services/DeleteCentroCustoService';

export default class CentroCustoController {
  async index(req: Request, res: Response): Promise<Response> {
    const svc = new ListCentroCustoService();
    return res.json(await svc.execute());
  }
  async show(req: Request, res: Response): Promise<Response> {
    const svc = new ShowCentroCustoService();
    return res.json(await svc.execute({ id: req.params.id }));
  }
  async create(req: Request, res: Response): Promise<Response> {
    const svc = new CreateCentroCustoService();
    return res.json(await svc.execute(req.body));
  }
  async update(req: Request, res: Response): Promise<Response> {
    const svc = new UpdateCentroCustoService();
    return res.json(await svc.execute({ id: req.params.id, ...req.body }));
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const svc = new DeleteCentroCustoService();
    await svc.execute({ id: req.params.id });
    return res.json([]);
  }
}
