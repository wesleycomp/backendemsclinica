import { getCustomRepository } from 'typeorm';
import Despesa from '../typeorm/entities/Despesa';
import { DespesaRepository } from '../typeorm/repositories/DespesaRepository';

interface IRequest {
  fornecedor_id: string;
  centro_custo_id?: string | null;
  categoria_id?: string | null;
  descricao: string;
  documento?: string;
  data_emissao?: string | null;
  data_vencimento?: string | null;
  valor_inicial?: number;
  forma_pagamento_id?: string | null;
  numero_parcelas?: number;
  status?: string;
}

class CreateDespesaService {
  public async execute(data: IRequest): Promise<Despesa> {
    const repo = getCustomRepository(DespesaRepository);
    const despesa = repo.create({
      fornecedor_id: data.fornecedor_id,
      centro_custo_id: data.centro_custo_id ?? null,
      categoria_id: data.categoria_id ?? null,
      descricao: data.descricao,
      documento: data.documento ?? null,
      data_emissao: data.data_emissao ?? null,
       data_vencimento: data.data_vencimento ?? null,
        valor_inicial: data.valor_inicial ?? 0,
     
      forma_pagamento_id: data.forma_pagamento_id ?? null,
      numero_parcelas: data.numero_parcelas ?? 1,
      status: data.status ?? 'ABERTA',
    });
    await repo.save(despesa);
    return despesa;
  }
}
export default CreateDespesaService;
