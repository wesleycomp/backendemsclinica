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

    const qb = asoRepo.createQueryBuilder('a')
      .select('a.empresa_id', 'empresa_id')
      .addSelect('emp.nome', 'empresa_nome')
      .addSelect('emp.cnpj', 'empresa_cnpj')

      // Métricas
      .addSelect('COUNT(DISTINCT a.id)', 'total_asos')
      .addSelect('COALESCE(SUM(ex.valorexame), 0)', 'valor_total')

      // Período dos exames
      .addSelect('MIN(a.dataemissaoaso)', 'periodo_inicio')
      .addSelect('MAX(a.dataemissaoaso)', 'periodo_fim')

      // Data do fechamento (pega do fechamento que realmente contém esses ASOs)
      .addSelect('MAX(f.data_fechamento)', 'data_fechamento')      // date (pode ser null)
      .addSelect('MAX(f.created_at)', 'fechado_em_created')        // timestamp (fallback)

      // Joins
      .innerJoin(
        ExameAso,
        'ex',
        'ex.aso_id = a.id AND ex.ativo = true AND ex.tipopagamento_id = :tp',
        { tp: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a' }
      )
      .innerJoin(Empresa, 'emp', 'emp.id = a.empresa_id')
      .leftJoin('fechamento_asos', 'fa', 'fa.aso_id = a.id')        // vincula ASO ao fechamento
      .leftJoin('fechamento', 'f', 'f.id = fa.fechamento_id')       // traz datas do fechamento

      // Filtros do período
      .where('a.ativo = true')
      .andWhere('a.dataemissaoaso BETWEEN :ini AND :fim', { ini: data_inicial, fim: data_final })

    if (empresa_id) {
      qb.andWhere('a.empresa_id = :empresa_id', { empresa_id })
    }

    qb.groupBy('a.empresa_id')
      .addGroupBy('emp.nome')
      .addGroupBy('emp.cnpj')
      .orderBy('emp.nome', 'ASC')

    const rows = await qb.getRawMany()

    return rows.map(r => {
      // se data_fechamento vier null, usa created_at do fechamento (recortado para YYYY-MM-DD)
      const fechadoEm =
        r.data_fechamento ||
        (r.fechado_em_created ? String(r.fechado_em_created).slice(0, 10) : null)

      return {
        empresa_id: r.empresa_id,
        empresa_nome: r.empresa_nome,
        empresa_cnpj: r.empresa_cnpj,
        total_asos: Number(r.total_asos || 0),
        valor_total: Number(r.valor_total || 0),
        periodo_inicio: r.periodo_inicio,
        periodo_fim: r.periodo_fim,
        data_fechamento: fechadoEm,
      }
    })
  }
}

export default ListFechamentoEmpresasService
