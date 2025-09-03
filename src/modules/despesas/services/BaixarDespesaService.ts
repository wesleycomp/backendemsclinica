// src/modules/despesas/services/BaixarDespesaService.ts
import AppError from '@shared/errors/AppError';
import Despesa from '../typeorm/entities/Despesa';
import DespesaRepository from '../typeorm/repositories/DespesaRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
  data_pagamento: Date | string;
  conta_bancaria_id?: string;
  observacao?: string;
  juros?: number | string;
  desconto?: number | string;
}

export default class BaixarDespesaService {
  public async execute({
    id,
    data_pagamento,
    conta_bancaria_id,
    observacao,
    juros = 0,
    desconto = 0,
  }: IRequest): Promise<Despesa> {
    const repo = getCustomRepository(DespesaRepository);

    const despesa = await repo.findById(id);
    if (!despesa) throw new AppError('Despesa não encontrada', 404);

    // normalizações
    const jurosNumber = Number(juros) || 0;
    const descontoNumber = Number(desconto) || 0;

    // cálculo: valor_total = valor_inicial + juros - desconto
    const inicial = Number(despesa.valor_inicial) || 0;
    const total = Number((inicial + jurosNumber - descontoNumber).toFixed(2));

    despesa.data_pagamento = data_pagamento ? new Date(data_pagamento) : null;
    despesa.conta_bancaria_id = conta_bancaria_id || null;
    despesa.observacao = observacao || null;

    // persistir campos financeiros
    despesa.juros = jurosNumber as any;      // coluna já existe
    despesa.desconto = descontoNumber as any;// coluna já existe
    despesa.valor_total = total as any;      // total calculado
    despesa.valor_pago = total as any;       // opcional: registrar pago = total
    despesa.status = 'PAGA';

    await repo.save(despesa);
    return despesa;
  }
}
