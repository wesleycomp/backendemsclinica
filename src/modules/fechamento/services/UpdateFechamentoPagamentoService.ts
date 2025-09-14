import { getRepository } from 'typeorm'
import Fechamento from '../typeorm/entities/Fechamento'

interface IRequest {
  id: string
  // edição geral
  empresa_id?: string
  valor_total?: number | string
  data_vencimento?: string // 'YYYY-MM-DD' ou ISO

  // pagamento
  status?: string          // 'pago' | 'aberto' (ou o que você usa)
  valor_pago?: number | string
  data_pagamento?: string  // 'YYYY-MM-DD' ou ISO
}
export default class UpdateFechamentoPagamentoService {
   public async execute({
    id,
    empresa_id,
    valor_total,
    data_vencimento,
    status,
    valor_pago,
    data_pagamento,
  }: IRequest): Promise<Fechamento> {
    const repo = getRepository(Fechamento)
    const fechamento = await repo.findOne(id, { relations: ['empresa'] })
    if (!fechamento) {
      throw new Error('Fechamento não encontrado')
    }

    // --------- Edição geral ---------
    if (empresa_id) {
      fechamento.empresa_id = String(empresa_id).trim()
    }
    if (valor_total !== undefined && valor_total !== null) {
      fechamento.valor_total = Number(valor_total)
    }
    if (data_vencimento) {
      const v =
        data_vencimento.length === 10
          ? new Date(`${data_vencimento}T00:00:00`)
          : new Date(data_vencimento)
      fechamento.data_vencimento = v as any
    }

    // --------- Pagamento ---------
    if (status) {
      fechamento.status = status.toLowerCase() as any
    }
    if (valor_pago !== undefined && valor_pago !== null) {
      fechamento.valor_pago = Number(valor_pago)
    }
    if (data_pagamento) {
      const p =
        data_pagamento.length === 10
          ? new Date(`${data_pagamento}T00:00:00`)
          : new Date(data_pagamento)
      fechamento.data_pagamento = p as any
    }

    await repo.save(fechamento)

    // retorna com relação de empresa carregada
    return repo.findOneOrFail(id, { relations: ['empresa'] })
  }
}
