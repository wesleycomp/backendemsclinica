import { getRepository } from 'typeorm'
import Aso from '@modules/aso/typeorm/entities/Aso'
import Paciente from '@modules/paciente/typeorm/entities/Paciente'
import ExameAso from '@modules/aso/typeorm/entities/ExamesAso'

interface IRequest {
  empresa_id: string
  data_inicial: string
  data_final: string
}

class ListExamesPorEmpresaService {
  public async execute({ empresa_id, data_inicial, data_final }: IRequest) {
    const asoRepo = getRepository(Aso)

    const query = asoRepo.createQueryBuilder('a')
      .select('a.id', 'aso_id')
      .addSelect('p.nome', 'paciente')
      .addSelect('a.resultado', 'resultado')
      .addSelect('a.dataemissaoaso', 'dataemissaoaso')
      .addSelect('ex.valorexame', 'valor_exame')
      .addSelect('e.name', 'exame_nome')
      .addSelect('ex.id', 'exameaso_id')
      .innerJoin(Paciente, 'p', 'p.id = a.paciente_id')
      .innerJoin(ExameAso, 'ex', 'ex.aso_id = a.id')
      .innerJoin('ex.exame', 'e')
      .where('a.empresa_id = :empresa_id', { empresa_id })
      .andWhere('a.ativo = true')
      .andWhere('ex.ativo = true')
      .andWhere('ex.tipopagamento_id = :tp', { tp: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a' }) // 👈 só convênio
      .andWhere('a.dataemissaoaso BETWEEN :inicio AND :fim', {
        inicio: data_inicial,
        fim: data_final,
      })
      .orderBy('a.dataemissaoaso', 'ASC')

    return await query.getRawMany()
  }
}

export default ListExamesPorEmpresaService
