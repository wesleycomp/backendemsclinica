import { getRepository, In } from 'typeorm'
import Fechamento from '../typeorm/entities/Fechamento'
import FechamentoAso from '../typeorm/entities/FechamentoAso'
import ExameAso from '@modules/aso/typeorm/entities/ExamesAso'

interface IRequest {
  id: string
}

export default class DeleteFechamentoService {
  public async execute({ id }: IRequest): Promise<void> {
    const fechamentoRepo = getRepository(Fechamento)
    const fechamentoAsoRepo = getRepository(FechamentoAso)
    const exameAsoRepo = getRepository(ExameAso)

    const fechamento = await fechamentoRepo.findOne(id)
    if (!fechamento) throw new Error('Fechamento não encontrado')

    // Opcional: proteger cobranças já pagas
    if (String(fechamento.status).toLowerCase() === 'pago') {
      throw new Error('Não é possível excluir uma cobrança paga')
    }

    // Buscar itens vinculados
    const itens = await fechamentoAsoRepo.find({ where: { fechamento_id: id } })

    // Reativar exames que foram inativados ao gerar a cobrança
    if (itens.length) {
      const asoIds = itens.map(i => i.aso_id)
      await exameAsoRepo.update({ aso_id: In(asoIds) }, { ativo: true })
    }

    // Remover vínculos e o cabeçalho
    await fechamentoAsoRepo.delete({ fechamento_id: id })
    await fechamentoRepo.delete(id)
  }
}
