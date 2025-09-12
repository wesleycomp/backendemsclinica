import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import DespesaParcela from '../typeorm/entities/DespesaParcela';
import { DespesaParcelaRepository } from '../typeorm/repositories/DespesaParcelaRepository';

interface IRequest {
  id: string;
  numero: number;
  vencimento: string;
  valor: number;
  status: 'ABERTA' | 'PAGA' | 'CANCELADA' | 'VENCIDA';
  data_pagamento?: string | null;
  valor_pago?: number | null;
  observacao?: string | null;
}

class UpdateDespesaParcelaService {
  public async execute(data: IRequest): Promise<DespesaParcela> {
    const repo = getCustomRepository(DespesaParcelaRepository);
    const parcela = await repo.findOne(data.id);
    if (!parcela) throw new AppError('Parcela não encontrada');

    parcela.numero = data.numero;
    parcela.vencimento = data.vencimento;
    parcela.valor = data.valor;
    parcela.status = data.status;
    parcela.data_pagamento = data.data_pagamento ?? null;
    parcela.valor_pago = (data.valor_pago ?? null) as any;
    parcela.observacao = data.observacao ?? null;

    await repo.save(parcela);
    return parcela;
  }
}
export default UpdateDespesaParcelaService;
