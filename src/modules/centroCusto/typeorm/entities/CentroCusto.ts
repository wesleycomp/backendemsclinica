import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('centro_custo')
class CentroCusto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  // 👇 Correção: string | null, não Object
  @Column({ type: 'varchar', length: 30, nullable: true, default: null })
  codigo: string | null;

  @Column({ default: true })
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CentroCusto;
