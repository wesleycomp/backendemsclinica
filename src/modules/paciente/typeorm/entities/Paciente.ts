import CategoriaTrabalhador from "@modules/categoriaTrabalhadores/typeorm/entities/CategoriaTrabalhador";
import Empresa from "@modules/empresa/typeorm/entities/Empresa";
import Funcao from "@modules/funcao/typeorm/entities/Funcao";
import Nacionalidade from "@modules/nacionalidade/typeorm/entities/Nacionalidade";
import { Column,  ManyToOne,  JoinColumn, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('paciente')
class Paciente{
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

     @ManyToOne(() => Nacionalidade)
     @JoinColumn( {name: 'nacionalidade_id'})
     nacionalidade: Nacionalidade;
     @Column()
     nacionalidade_id: string;

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

export default Paciente
