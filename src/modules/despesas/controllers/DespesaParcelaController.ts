import { Request, Response } from 'express';
import Create from '../services/CreateDespesaParcelaService';
import List from '../services/ListDespesaParcelaService';
import Show from '../services/ShowDespesaParcelaService';
import Update from '../services/UpdateDespesaParcelaService';
import DeleteSvc from '../services/DeleteDespesaParcelaService';
import ListByDespesa from '../services/ListParcelasByDespesaService';
import Pagar from '../services/PagarDespesaParcelaService';

export default class DespesaParcelaController {
  async index(req: Request, res: Response) {
    const svc = new List();
    return res.json(await svc.execute());
  }

  async show(req: Request, res: Response) {
    const svc = new Show();
    return res.json(await svc.execute({ id: req.params.id }));
  }

  async listByDespesa(req: Request, res: Response) {
    const svc = new ListByDespesa();
    return res.json(await svc.execute({ despesa_id: req.params.despesa_id }));
  }

  async create(req: Request, res: Response) {
    const svc = new Create();
    return res.json(await svc.execute(req.body));
  }

  async update(req: Request, res: Response) {
    const svc = new Update();
    return res.json(await svc.execute({ id: req.params.id, ...req.body }));
  }

  async delete(req: Request, res: Response) {
    const svc = new DeleteSvc();
    await svc.execute({ id: req.params.id });
    return res.json([]);
  }

  // opcional: “quitar” parcela
  async pagar(req: Request, res: Response) {
    const svc = new Pagar();
    return res.json(await svc.execute({ id: req.params.id, ...req.body }));
  }
}
