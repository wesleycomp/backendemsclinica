import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('medico')
class Medico{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome: string;

    @Column()
    cpf: string

    @Column()
    rg: string

    @Column()
    crm: string

    @Column()
    ufcrm: string

    @Column()
    telefone: string;

    @Column()
    datanascimento: Date;

    @Column()
    endereco: string;

    @Column()
    email: string;

     @Column()
     ativo: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Medico
