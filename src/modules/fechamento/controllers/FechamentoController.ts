import { Request, Response } from 'express';
import CreateFechamentoService from '../services/CreateFechamentoService';
import ListFechamentosService from '../services/ListFechamentosService';
import UpdateFechamentoPagamentoService from '../services/UpdateFechamentoPagamentoService'

export default class FechamentoController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { empresa_id, data_inicial, data_final, criado_por, exameaso_ids } =
      request.body

    const service = new CreateFechamentoService()

    const fechamento = await service.execute({
      empresa_id,
      data_inicial,
      data_final,
      criado_por,
      exameaso_ids,
    })

    return response.json(fechamento)
  }

  public async atualizarPagamento(request: Request, response: Response): Promise<Response> {
  const { id } = request.params
  const { status, valor_pago, data_pagamento } = request.body

  const service = new UpdateFechamentoPagamentoService()

  const fechamento = await service.execute({
    fechamento_id: id,
    status,
    valor_pago,
    data_pagamento,
  })

  return response.json(fechamento)
}

public async index(req: Request, res: Response): Promise<Response> {
  const { page, per_page, empresa_id, status, data_inicial, data_final } = req.query

  const service = new ListFechamentosService()
  const result = await service.execute({
    page: page ? Number(page) : 1,
    per_page: per_page ? Number(per_page) : 10,
    empresa_id: empresa_id ? String(empresa_id) : undefined,
    status: status ? String(status) : undefined,
    data_inicial: data_inicial ? String(data_inicial) : undefined,
    data_final: data_final ? String(data_final) : undefined
  })

  return res.json(result)
}

}
