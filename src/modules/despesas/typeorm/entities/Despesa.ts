import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import ContaBancaria from "@modules/contabancaria/typeorm/entities/ContaBancaria";

@Entity("despesas")
export default class Despesa {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fornecedor_id: string;

  @Column({ type: "uuid", nullable: true })
  centro_custo_id?: string | null;

  @Column({ type: "uuid", nullable: true })
  categoria_id?: string | null;

  @Column({ length: 200 })
  descricao: string;

  @Column({ type: "varchar", length: 60, nullable: true, default: null })
  documento?: string | null;

  @Column({ type: "date", nullable: true, default: null })
  data_emissao?: Date | null;

  @Column({ type: "date", nullable: true, default: null })
  data_vencimento?: Date | null;

  @Column({ type: "date", nullable: true })
  data_pagamento?: Date | null; // 👈 adicionado

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  valor_total: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  valor_pago: number;

  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  desconto: number;


  @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  valor_inicial: number;

    @Column({ type: "decimal", precision: 14, scale: 2, default: 0 })
  juros: number;


  @Column({ type: "uuid", nullable: true })
  forma_pagamento_id?: string | null;

  @Column({ type: "int", default: 1 })
  numero_parcelas: number;

  @Column({ type: "varchar", length: 10, default: "ABERTA" })
  status: string; // ABERTA | PARCIAL | PAGA | CANCELADA

  // 🔹 Relação com ContaBancaria
  @Column({ type: "uuid", nullable: true })
  conta_bancaria_id?: string | null;

@ManyToOne(() => ContaBancaria, (conta: ContaBancaria) => conta.despesas, { nullable: true })
@JoinColumn({ name: "conta_bancaria_id" })
conta_bancaria?: ContaBancaria;


  // 🔹 Observação
  @Column({ type: "varchar", length: 255, nullable: true })
  observacao?: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

