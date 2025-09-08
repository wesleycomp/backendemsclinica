import { getRepository } from 'typeorm'
import Despesa from '../typeorm/entities/Despesa'

interface IRequest {
  page?: number
  per_page?: number
  descricao?: string
  status?: string
  data_inicial?: string
  data_final?: string
}

interface IResponse {
  items: Despesa[]
  total: number
  page: number
  per_page: number
}

class ListDespesasService {
  public async execute({
    page = 1,
    per_page = 10,
    descricao,
    status,
    data_inicial,
    data_final
  }: IRequest): Promise<IResponse> {
    const repo = getRepository(Despesa)

    let query = repo.createQueryBuilder('despesa')

    // 🔎 filtro por descrição
    if (descricao) {
      query = query.andWhere('despesa.descricao ILIKE :descricao', {
        descricao: `%${descricao}%`
      })
    }

    // 🔎 filtro por status
    if (status) {
      query = query.andWhere('despesa.status = :status', { status })
    }

    // 🔎 filtro por período de vencimento
    if (data_inicial && data_final) {
      query = query.andWhere('despesa.data_vencimento BETWEEN :ini AND :fim', {
        ini: data_inicial,
        fim: data_final
      })
    } else if (data_inicial) {
      query = query.andWhere('despesa.data_vencimento >= :ini', { ini: data_inicial })
    } else if (data_final) {
      query = query.andWhere('despesa.data_vencimento <= :fim', { fim: data_final })
    }

    // 🔹 paginação e ordenação
    query = query.orderBy('despesa.data_vencimento', 'DESC')
      .skip((page - 1) * per_page)
      .take(per_page)

    // 🔹 busca e contagem em uma tacada só
    const [items, total] = await query.getManyAndCount()

    return {
      items,
      total,
      page,
      per_page
    }
  }
}

export default ListDespesasService
