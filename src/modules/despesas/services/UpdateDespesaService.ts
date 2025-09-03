import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Despesa from '../typeorm/entities/Despesa';
import { DespesaRepository } from '../typeorm/repositories/DespesaRepository';

interface IRequest {
  id: string;
  fornecedor_id: string;
  centro_custo_id?: string | null;
  categoria_id?: string | null;
  descricao: string;
  documento?: string;
  data_emissao?: string | null;
  valor_inicial_edit?: number;
  forma_pagamento?: string;
  numero_parcelas?: number;
  status: string;
}

class UpdateDespesaService {
  public async execute(payload: IRequest): Promise<Despesa> {
    const repo = getCustomRepository(DespesaRepository);
    const item = await repo.findOne(payload.id);
    if (!item) throw new AppError('Despesa não encontrada');

    Object.assign(item, {
      fornecedor_id: payload.fornecedor_id,
      centro_custo_id: payload.centro_custo_id ?? null,
      categoria_id: payload.categoria_id ?? null,
      descricao: payload.descricao,
      documento: payload.documento ?? null,
      data_emissao: payload.data_emissao ?? null,
      valor_inicial: payload.valor_inicial_edit ?? 0,
      forma_pagamento: payload.forma_pagamento ?? null,
      numero_parcelas: payload.numero_parcelas ?? 1,
      status: payload.status,
    });

    await repo.save(item);
    return item;
  }
}
export default UpdateDespesaService;
