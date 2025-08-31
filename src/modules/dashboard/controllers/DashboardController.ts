import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import DashboardRepository from '../typeorm/repositories/DashboardRepository';

export default class DashboardController {
  public async resumoFinanceiro(req: Request, res: Response): Promise<Response> {
    const { ano, mes, dia, dataInicio, dataFim } = req.query;
    const repo = getCustomRepository(DashboardRepository);

    const result = await repo.resumoFinanceiro(
      ano ? Number(ano) : undefined,
      mes ? Number(mes) : undefined,
      dia ? Number(dia) : undefined,
      dataInicio ? String(dataInicio) : undefined,
      dataFim ? String(dataFim) : undefined
    );

    return res.json(result);
  }

  public async receitasPorPagamento(req: Request, res: Response): Promise<Response> {
    const { ano, mes, dia, dataInicio, dataFim } = req.query;
    const repo = getCustomRepository(DashboardRepository);

    const result = await repo.receitasPorPagamento(
      ano ? Number(ano) : undefined,
      mes ? Number(mes) : undefined,
      dia ? Number(dia) : undefined,
      dataInicio ? String(dataInicio) : undefined,
      dataFim ? String(dataFim) : undefined
    );

    return res.json(result);
  }

  public async receitasVsDespesas(req: Request, res: Response): Promise<Response> {
    const { ano, mes, dia, dataInicio, dataFim } = req.query;
    const repo = getCustomRepository(DashboardRepository);

    const result = await repo.receitasVsDespesas(
      ano ? Number(ano) : undefined,
      mes ? Number(mes) : undefined,
      dia ? Number(dia) : undefined,
      dataInicio ? String(dataInicio) : undefined,
      dataFim ? String(dataFim) : undefined
    );

    return res.json(result);
  }
}
