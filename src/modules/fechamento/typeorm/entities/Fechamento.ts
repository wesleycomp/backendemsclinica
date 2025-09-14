import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import Empresa from '@modules/empresa/typeorm/entities/Empresa'
import User from '@modules/users/typeorm/entities/User'
import FechamentoAso from './FechamentoAso'

@Entity('fechamento')
class Fechamento {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  empresa_id: string

@ManyToOne(() => Empresa)
@JoinColumn({ name: 'empresa_id' })
empresa: Empresa


  @Column({ type: 'date' })
  data_inicial: Date

  @Column({ type: 'date' })
  data_final: Date

  @Column({ type: 'date', nullable: true })
  data_vencimento?: Date


  @Column()
  criado_por: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'criado_por' })
  usuario: User

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  valor_total: number

  @Column({ type: 'varchar', length: 20, default: 'aberto' })
  status: string // aberto | parcialmente_pago | pago | cancelado

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  valor_pago: number

    @Column({ type: 'date', nullable: true })
    data_fechamento: Date | null

  @Column({ type: 'timestamp', nullable: true })
  data_pagamento: Date | null

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacao: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => FechamentoAso, fa => fa.fechamento, { cascade: true })
  asos: FechamentoAso[]
}

export default Fechamento
