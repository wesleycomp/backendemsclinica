import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pacientes')
class Pacientes{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome: string;

    @Column()
    cpf: string

    @Column()
    rg: string

    @Column()
    telefone: string;

    @Column()
    datanascimento: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Pacientes
