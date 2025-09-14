import { getRepository, In } from 'typeorm'
import Fechamento from '../typeorm/entities/Fechamento'
import FechamentoAso from '../typeorm/entities/FechamentoAso'
import ExameAso from '@modules/aso/typeorm/entities/ExamesAso'

interface IRequest {
  empresa_id: string
  data_inicial: string
  data_final: string
  criado_por: string
  exameaso_ids: string[]
  data_vencimento?: string
}

class CreateFechamentoService {
  public async execute({
    empresa_id,
    data_inicial,
    data_final,
    criado_por,
    exameaso_ids,
     data_vencimento
  }: IRequest): Promise<Fechamento> {
    const fechamentoRepo = getRepository(Fechamento)
    const fechamentoAsoRepo = getRepository(FechamentoAso)
    const exameAsoRepo = getRepository(ExameAso)

    const vencimento =
      (data_vencimento || data_final)
        ? new Date(data_vencimento || data_final)
        : null

    // 🔎 Buscar exames ativos selecionados e tipo pagamento convenio
   const exames = await exameAsoRepo.find({
        where: {
            id: In(exameaso_ids),
            ativo: true,
            tipopagamento_id: '51cf6cb6-4d7f-416a-85af-21b53f0b4c2a'
        },
        relations: ['aso'],
        })


    if (!exames.length) {
      throw new Error('Nenhum exame válido encontrado para cobrança')
    }

    // 💰 Calcular valor total
    const valor_total = exames.reduce(
      (acc, ex) => acc + Number(ex.valorexame || 0),
      0,
    )

    // 📝 Criar cabeçalho do fechamento
    const fechamento = fechamentoRepo.create({
      empresa_id,
      data_inicial,
      data_final,
      criado_por,
      valor_total,
      status: 'aberto',
       data_vencimento: vencimento as any, // <— usar a variável calculada
      valor_pago: 0,
      data_pagamento: null,
    })

    await fechamentoRepo.save(fechamento)

    // 🔗 Vincular ASOs ao fechamento
    const itens = exames.map(ex => {
      return fechamentoAsoRepo.create({
        fechamento_id: fechamento.id,
        aso_id: ex.aso_id,
        valor: ex.valorexame,
      })
    })

    await fechamentoAsoRepo.save(itens)

    // ❌ Atualizar exames para inativos
    await exameAsoRepo.update(
      { id: In(exameaso_ids) },
      { ativo: false },
    )

    // carregar asos vinculados
    fechamento.asos = itens

    return fechamento
  }
}

export default CreateFechamentoService
