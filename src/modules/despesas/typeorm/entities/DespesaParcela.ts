// src/modules/despesaParcelas/typeorm/entities/DespesaParcela.ts
import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity('despesa_parcelas')
class DespesaParcela {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  despesa_id: string;

  @Column()
  numero: number;

  @Column({ type: 'date' })
  vencimento: string;

  @Column({ type: 'decimal', precision: 14, scale: 2 })
  valor: number;

  @Column({ default: 'ABERTA' })
  status: string; // ABERTA | PAGA | CANCELADA | VENCIDA

  @Column({ type: 'date', nullable: true, default: null })
  data_pagamento: string | null;

  @Column({ type: 'decimal', precision: 14, scale: 2, nullable: true, default: null })
  valor_pago: number | null;

  @Column({ type: 'text', nullable: true, default: null })
  observacao: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default DespesaParcela;
