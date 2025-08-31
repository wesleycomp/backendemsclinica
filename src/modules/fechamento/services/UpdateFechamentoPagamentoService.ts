import { getRepository } from 'typeorm'
import Fechamento from '../typeorm/entities/Fechamento'

interface IRequest {
  fechamento_id: string
  status: 'aberto' | 'pago' | 'parcial'
  valor_pago: number
  data_pagamento: string
}

class UpdateFechamentoPagamentoService {
  public async execute({
    fechamento_id,
    status,
    valor_pago,
    data_pagamento,
  }: IRequest): Promise<Fechamento> {
    const repo = getRepository(Fechamento)

    const fechamento = await repo.findOne(fechamento_id)

    if (!fechamento) {
      throw new Error('Fechamento não encontrado')
    }

    // Atualiza status e valores
    fechamento.status = status
    fechamento.valor_pago = valor_pago
    fechamento.data_pagamento = data_pagamento ? new Date(data_pagamento) : null

    await repo.save(fechamento)

    return fechamento
  }
}

export default UpdateFechamentoPagamentoService
