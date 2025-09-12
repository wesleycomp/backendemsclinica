import { getCustomRepository } from 'typeorm';
import { FinanceiroRepository } from '../typeorm/repositories/FinanceiroRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class ShowFinanceiroService {
  public async execute({ id }: IRequest) {
    // instancia o repositório para ter acesso aos métodos (save, delete, find... etc)
    const financeiroRepository = getCustomRepository(FinanceiroRepository);

    const financeiro = await financeiroRepository.findOne(id);

    if (!financeiro) {
      throw new AppError('Financeiro não encontrado');
    }

    return financeiro;
  }
}

export default ShowFinanceiroService;

