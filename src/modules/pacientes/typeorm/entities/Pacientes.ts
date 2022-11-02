import CategoriaTrabalhador from "@modules/categoriaTrabalhadores/typeorm/entities/CategoriaTrabalhador";
import Empresa from "@modules/empresas/typeorm/entities/Empresa";
import Funcao from "@modules/funcoes/typeorm/entities/Funcao";
import { Column,  ManyToOne,  JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pacientes')
class Pacientes{
    @PrimaryGeneratedColumn('uuid')
    id: string

     @ManyToOne(() => Empresa)
     @JoinColumn( {name: 'empresa_id'})
     empresa: Empresa;
     @Column()
     empresa_id: string;


     @ManyToOne(() => Funcao)
     @JoinColumn( {name: 'funcao_id'})
     funcao: Empresa;
     @Column()
     funcao_id: string;


     @ManyToOne(() => CategoriaTrabalhador)
     @JoinColumn( {name: 'categoriatrabalhador_id'})
     categoriatrabalhador: CategoriaTrabalhador;
     @Column()
     categoriatrabalhador_id: string;

    @Column()
     matricula: string;

    @Column()
     dataentradaempresa: Date;

    @Column()
     descricaoatividade: string;

    @Column()
     nome: string;

    @Column()
     cpf: string

    @Column()
     rg: string

    @Column()
     telefone: string;

    @Column()
     genero: string;

    @Column()
     tiposanguineo: string;

    @Column()
     nacionalidade: string;

    @Column()
     nis: string;

    @Column()
     ctps: string;

    @Column()
     datanascimento: Date;

    @Column()
     endereco: string;

    @Column()
     email: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Pacientes
