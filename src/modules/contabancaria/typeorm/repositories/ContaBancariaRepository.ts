// src/modules/contaBancaria/typeorm/repositories/ContaBancariaRepository.ts
import { EntityRepository, Repository } from 'typeorm';
import ContaBancaria from '../entities/ContaBancaria';

@EntityRepository(ContaBancaria)
export default class ContaBancariaRepository extends Repository<ContaBancaria> {
  findByNome(nome: string) {
    return this.findOne({ where: { nome } });
  }

  findAll() {
    return this.find({ order: { nome: 'ASC' } });
  }
}
