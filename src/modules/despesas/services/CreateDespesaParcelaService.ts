import { getCustomRepository } from 'typeorm';
import DespesaParcela from '../typeorm/entities/DespesaParcela';
import { DespesaParcelaRepository } from '../typeorm/repositories/DespesaParcelaRepository';

interface IRequest {
  despesa_id: string;
  numero: number;
  vencimento: string; // YYYY-MM-DD
  valor: number;
  status?: 'ABERTA' | 'PAGA' | 'CANCELADA' | 'VENCIDA';
  observacao?: string | null;
}

class CreateDespesaParcelaService {
  public async execute(data: IRequest): Promise<DespesaParcela> {
    const repo = getCustomRepository(DespesaParcelaRepository);

    const parcela = repo.create({
      despesa_id: data.despesa_id,
      numero: data.numero,
      vencimento: data.vencimento,
      valor: data.valor,
      status: (data.status ?? 'ABERTA') as string,
      observacao: data.observacao ?? null,
      data_pagamento: null,
      valor_pago: null,
    });

    await repo.save(parcela);
    return parcela;
  }
}
export default CreateDespesaParcelaService;
