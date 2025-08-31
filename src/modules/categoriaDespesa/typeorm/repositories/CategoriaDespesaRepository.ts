import { EntityRepository, Repository } from 'typeorm';
import CategoriaDespesa from '../entities/CategoriaDespesa';

@EntityRepository(CategoriaDespesa)
export class CategoriaDespesaRepository extends Repository<CategoriaDespesa> {
  findByNome(nome: string) { return this.findOne({ where: { nome } }); }
  findAll() { return this.find({ order: { nome: 'ASC' } }); }
}
export default CategoriaDespesaRepository;
