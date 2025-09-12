// src/modules/despesas/services/ShowDespesaService.ts

import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Despesa from '../typeorm/entities/Despesa';
import { DespesaRepository } from '../typeorm/repositories/DespesaRepository';

interface IRequest {
  id: string;
}

class ShowDespesaService {
  public async execute({ id }: IRequest): Promise<Despesa> {
    const repo = getCustomRepository(DespesaRepository);

    const despesa = await repo.findOne(id, {
      relations: [
        'fornecedor',
        'centro_custo',
        'categoria',
        'forma_pagamento',
        'conta_bancaria',
      ],
    });

    if (!despesa) {
      throw new AppError('Despesa não encontrada.');
    }

    return despesa;
  }
}

export default ShowDespesaService;
