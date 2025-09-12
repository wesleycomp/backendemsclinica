import { Request, Response } from 'express';
import CreateDespesaService from '../services/CreateDespesaService';
import ListDespesaService from '../services/ListDespesaService';
import ShowDespesaService from '../services/ShowDespesaService';
import UpdateDespesaService from '../services/UpdateDespesaService';
import DeleteDespesaService from '../services/DeleteDespesaService';
import BaixarDespesaService from '../services/BaixarDespesaService'; // 👈 ajuste no path

export default class DespesaController {
   public async index(req: Request, res: Response): Promise<Response> {
    const { page, per_page, descricao, status, data_inicial, data_final } = req.query

    const service = new ListDespesaService()

    const result = await service.execute({
      page: page ? Number(page) : 1,
      per_page: per_page ? Number(per_page) : 10,
      descricao: descricao ? String(descricao) : undefined,
      status: status ? String(status) : undefined,
      data_inicial: data_inicial ? String(data_inicial) : undefined,
      data_final: data_final ? String(data_final) : undefined
    })

    return res.json(result)
  }

  async show(req: Request, res: Response): Promise<Response> {
    return res.json(await new ShowDespesaService().execute({ id: req.params.id }));
  }

  async create(req: Request, res: Response): Promise<Response> {
    return res.json(await new CreateDespesaService().execute(req.body));
  }

  async update(req: Request, res: Response): Promise<Response> {
    return res.json(await new UpdateDespesaService().execute({ id: req.params.id, ...req.body }));
  }

  async delete(req: Request, res: Response): Promise<Response> {
    await new DeleteDespesaService().execute({ id: req.params.id });
    return res.json([]);
  }

// src/modules/despesas/controllers/DespesaController.ts
async baixar(req: Request, res: Response): Promise<Response> {
  const { id } = req.params;
  const { data_pagamento, conta_bancaria_id, observacao, juros, desconto } = req.body;

  const service = new BaixarDespesaService();
  const despesa = await service.execute({
    id,
    data_pagamento,
    conta_bancaria_id,
    observacao,
    juros,
    desconto,
  });

  return res.json(despesa);
}


}
