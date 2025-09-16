// src/modules/fechamento/services/UpdateFechamentoPagamentoService.ts
import { getRepository, getConnection } from 'typeorm'
import AppError from '@shared/errors/AppError';
import Fechamento from '../typeorm/entities/Fechamento'
import Empresa from '@modules/empresa/typeorm/entities/Empresa'
 
interface IRequest {
  id: string
  // edição geral
  empresa_id?: string
  valor_total?: number | string
  data_vencimento?: string // 'YYYY-MM-DD' ou ISO
  // pagamento
  status?: string          // 'pago' | 'aberto' ...
  valor_pago?: number | string
  data_pagamento?: string  // 'YYYY-MM-DD' ou ISO
}

function toDateMaybe(v?: string): Date | undefined {
  if (!v) return undefined
  return v.length === 10 ? new Date(`${v}T00:00:00`) : new Date(v)
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
    const repoFechamento = getRepository(Fechamento)
    const repoEmpresa = getRepository(Empresa)

    // carrega o registro com a relação (para termos o estado atual)
    const fechamento = await repoFechamento.findOne(id, { relations: ['empresa'] })
    if (!fechamento) throw new AppError('Fechamento não encontrado', 404);


    // --- troca de empresa (⚠️ ATUALIZA FK E RELAÇÃO) ---
    if (empresa_id && empresa_id !== (fechamento as any).empresa_id) {
      const empresa = await repoEmpresa.findOne(empresa_id)
     if (!empresa) throw new AppError('Empresa inválida', 400);
  
      // 1) setar a FK
      (fechamento as any).empresa_id = empresa.id
      // 2) e setar a RELAÇÃO (senão o TypeORM mantém a antiga)
      ;(fechamento as any).empresa = { id: empresa.id } as Empresa
    }

    // --- Edição geral ---
    if (valor_total !== undefined && valor_total !== null) {
      (fechamento as any).valor_total = Number(valor_total)
    }
    const venc = toDateMaybe(data_vencimento)
    if (venc !== undefined) (fechamento as any).data_vencimento = venc as any

    // --- Pagamento ---
    if (status) (fechamento as any).status = status.toLowerCase() as any
    if (valor_pago !== undefined && valor_pago !== null) {
      (fechamento as any).valor_pago = Number(valor_pago)
    }
    const pag = toDateMaybe(data_pagamento)
    if (pag !== undefined) (fechamento as any).data_pagamento = pag as any

    await repoFechamento.save(fechamento)

    // 🔁 recarrega via query builder pra não retornar cache/estado antigo
    const refreshed = await getConnection()
      .getRepository(Fechamento)
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.empresa', 'empresa')
      .where('f.id = :id', { id })
      .getOneOrFail()

    return refreshed
  }
}
