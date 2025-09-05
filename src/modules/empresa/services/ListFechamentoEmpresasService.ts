import { getRepository } from 'typeorm'
import Aso from '@modules/aso/typeorm/entities/Aso'
import ExameAso from '@modules/aso/typeorm/entities/ExamesAso'
import Empresa from '@modules/empresa/typeorm/entities/Empresa'

interface IRequest {
  data_inicial: string
  data_final: string
  empresa_id?: string
}

class ListFechamentoEmpresasService {
  public async execute({ data_inicial, data_final, empresa_id }: IRequest) {
    const asoRepo = getRepository(Aso)

    const query = asoRepo.createQueryBuilder('a')
      .select('a.empresa_id', 'empresa_id')
      .addSelect('emp.nome', 'empresa_nome')
      .addSelect('emp.cnpj', 'empresa_cnpj')
      .addSelect('COUNT(a.id)', 'total_asos')
      .addSelect('SUM(ex.valorexame)', 'valor_total')
      .innerJoin(ExameAso, 'ex', 'ex.aso_id = a.id')
      .innerJoin(Empresa, 'emp', 'emp.id = a.empresa_id')
      .where('a.ativo = true')
      .andWhere('ex.ativo = true')
      .andWhere('ex.tipopagamento_id = :tp', { tp: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a' }) // só convênio
      .andWhere('a.dataemissaoaso BETWEEN :inicio AND :fim', {
        inicio: data_inicial,
        fim: data_final,
      })

    // 👇 filtro adicional se usuário escolheu empresa
    if (empresa_id) {
      query.andWhere('a.empresa_id = :empresa_id', { empresa_id })
    }

    query.groupBy('a.empresa_id')
      .addGroupBy('emp.nome')
      .addGroupBy('emp.cnpj')
      .orderBy('emp.nome', 'ASC')

    return await query.getRawMany()
  }
}

export default ListFechamentoEmpresasService
