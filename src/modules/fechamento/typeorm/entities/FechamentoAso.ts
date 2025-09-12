import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import Fechamento from './Fechamento'
import Aso from '@modules/aso/typeorm/entities/Aso'

@Entity('fechamento_asos')
class FechamentoAso {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  fechamento_id: string

  @ManyToOne(() => Fechamento, f => f.asos)
  @JoinColumn({ name: 'fechamento_id' })
  fechamento: Fechamento

  @Column()
  aso_id: string

  @ManyToOne(() => Aso)
  @JoinColumn({ name: 'aso_id' })
  aso: Aso

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  valor: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default FechamentoAso
