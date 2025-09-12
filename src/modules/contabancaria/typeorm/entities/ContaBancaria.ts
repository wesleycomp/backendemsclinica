// src/modules/contabancaria/infra/typeorm/entities/ContaBancaria.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import Despesa from "@modules/despesas/typeorm/entities/Despesa";

@Entity("conta_bancaria")
export default class ContaBancaria {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  nome: string;

  @Column()
  agencia: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  tipo?: string; // corrente, poupança, etc.

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

@OneToMany(() => Despesa, (despesa: Despesa) => despesa.conta_bancaria)
despesas: Despesa[];

}
