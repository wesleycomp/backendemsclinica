import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import DespesaParcela from '../typeorm/entities/DespesaParcela';
import { DespesaParcelaRepository } from '../typeorm/repositories/DespesaParcelaRepository';

interface IRequest {
  id: string;
  data_pagamento: string; // YYYY-MM-DD
  valor_pago: number;
  observacao?: string | null;
}

class PagarDespesaParcelaService {
  public async execute({ id, data_pagamento, valor_pago, observacao }: IRequest): Promise<DespesaParcela> {
    const repo = getCustomRepository(DespesaParcelaRepository);
    const parcela = await repo.findOne(id);
    if (!parcela) throw new AppError('Parcela não encontrada');

    parcela.status = 'PAGA';
    parcela.data_pagamento = data_pagamento;
    parcela.valor_pago = valor_pago as any;
    parcela.observacao = observacao ?? parcela.observacao;

    await repo.save(parcela);
    return parcela;
  }
}
export default PagarDespesaParcelaService;
