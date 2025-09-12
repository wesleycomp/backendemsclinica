// src/modules/contaBancaria/controllers/ContaBancariaController.ts
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import ContaBancariaRepository from '../typeorm/repositories/ContaBancariaRepository';

export default class ContaBancariaController {
  public async index(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(ContaBancariaRepository);
    const contas = await repo.findAll();
    return res.json(contas);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(ContaBancariaRepository);
    const conta = repo.create(req.body);
    await repo.save(conta);
    return res.json(conta);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const repo = getCustomRepository(ContaBancariaRepository);
    await repo.delete(req.params.id);
    return res.status(204).send();
  }
}
