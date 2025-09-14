import { Request, Response } from 'express';
import CreateFechamentoService from '../services/CreateFechamentoService';
import ListFechamentosService from '../services/ListFechamentosService';
import UpdateFechamentoPagamentoService from '../services/UpdateFechamentoPagamentoService'

import DeleteFechamentoService from '../services/DeleteFechamentoService'

export default class FechamentoController {

  public async create(request: Request, response: Response): Promise<Response> {
    const { empresa_id, data_inicial, data_final,data_vencimento, criado_por, exameaso_ids } =
      request.body

    const service = new CreateFechamentoService()

    const fechamento = await service.execute({
      empresa_id,
      data_inicial,
      data_final,
      data_vencimento, // NOVO
      criado_por,
      exameaso_ids,
    })

    return response.json(fechamento)
  }

  public async atualizarPagamento(request: Request, response: Response): Promise<Response> {
  const { id } = request.params
  const { status, valor_pago, data_pagamento, data_vencimento } = request.body

  const service = new UpdateFechamentoPagamentoService()

  const fechamento = await service.execute({
    id,
    status,
    valor_pago,
    data_vencimento,
    data_pagamento,
  })

  return response.json(fechamento)
}
public async destroy(request: Request, response: Response): Promise<Response> {
  const { id } = request.params
  const service = new DeleteFechamentoService()
  await service.execute({ id })
  return response.status(204).send()
}
public async index(req: Request, res: Response): Promise<Response> {
  const { page, per_page, empresa_id, status, data_vencimento, data_inicial, data_final } = req.query

  const service = new ListFechamentosService()
  const result = await service.execute({
    page: page ? Number(page) : 1,
    per_page: per_page ? Number(per_page) : 10,
    empresa_id: empresa_id ? String(empresa_id) : undefined,
    status: status ? String(status) : undefined,
    data_vencimento: data_vencimento  ? String(data_vencimento) : undefined,
    data_inicial: data_inicial ? String(data_inicial) : undefined,
    data_final: data_final ? String(data_final) : undefined
  })

  return res.json(result)
}

public async update(request: Request, response: Response): Promise<Response> {
  const { id } = request.params
  const { empresa_id, valor_total, data_vencimento } = request.body

  const service = new UpdateFechamentoPagamentoService()
  const fechamento = await service.execute({
    id,
    empresa_id,
    valor_total,
    data_vencimento,
  })

  // opcional: normalizar resposta
  return response.json({
    id: fechamento.id,
    empresa_id: fechamento.empresa_id,
    empresa_nome: fechamento.empresa?.nome,
    empresa_cnpj: fechamento.empresa?.cnpj,
    valor_total: fechamento.valor_total,
    valor_pago: fechamento.valor_pago,
    status: fechamento.status,
    data_vencimento: fechamento.data_vencimento,
    data_pagamento: fechamento.data_pagamento,
    data_fechamento: fechamento.data_fechamento || fechamento.created_at,
    created_at: fechamento.created_at,
  })
}

}
