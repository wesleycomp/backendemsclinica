import { getRepository } from 'typeorm'
import Fechamento from '../typeorm/entities/Fechamento'
 

interface IRequest {
  page?: number
  per_page?: number
   empresa_id?: string
  status?: string
  data_inicial?: string
  data_final?: string
  data_vencimento?: string  // ✅ novo
}

interface IResponse {
  items: any[]
  total: number
  page: number
  per_page: number
}

class ListFechamentosService {
  public async execute({
    page = 1,
    per_page = 10,
    empresa_id,
    status,
    data_inicial,
    data_final,
    data_vencimento,         // ✅ destruture
  }: IRequest): Promise<IResponse> {
    const repo = getRepository(Fechamento)

    const query = repo
      .createQueryBuilder('fechamento')
      .leftJoinAndSelect('fechamento.empresa', 'empresa')

     // 🔎 filtro por empresa_id (select)
    if (empresa_id) {
      query.andWhere('empresa.id = :empresa_id', { empresa_id })
    }

    // 🔎 filtro por status
    if (status) {
      query.andWhere('fechamento.status = :status', { status })
    }

    // 🔎 filtro por período (data_fechamento)
    if (data_inicial && data_final) {
      query.andWhere('fechamento.data_fechamento BETWEEN :ini AND :fim', {
        ini: data_inicial,
        fim: data_final,
      })
    } else if (data_inicial) {
      query.andWhere('fechamento.data_fechamento >= :ini', { ini: data_inicial })
    } else if (data_final) {
      query.andWhere('fechamento.data_fechamento <= :fim', { fim: data_final })
    }

    if (data_vencimento) {
    query.andWhere('fechamento.data_vencimento = :data_vencimento', { data_vencimento })
    }

    query.orderBy('fechamento.data_fechamento', 'DESC')

    // 🔹 total antes da paginação
    const total = await query.getCount()

    // 🔹 aplica paginação
    const fechamentos = await query
      .skip((page - 1) * per_page)
      .take(per_page)
      .getMany()

    // 🔹 mapeia resultado para incluir empresa_nome e empresa_cnpj
    const items = fechamentos.map(f => ({
      id: f.id,
      empresa_id: f.empresa_id,
      empresa_nome: f.empresa ? f.empresa.nome : '',
      empresa_cnpj: f.empresa ? f.empresa.cnpj : '',
      valor_total: Number(f.valor_total || 0),
      valor_pago: Number(f.valor_pago || 0),
      status: f.status,
       data_vencimento: f.data_vencimento,             // <— NOVO
      data_pagamento: f.data_pagamento,
      data_fechamento: f.data_fechamento || f.created_at,
      created_at: f.created_at,
    }))

    return {
      items,
      total,
      page,
      per_page,
    }
  }
}

export default ListFechamentosService
