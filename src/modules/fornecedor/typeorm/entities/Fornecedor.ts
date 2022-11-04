import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('fornecedor')
class Fornecedor {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     nome: string;

     @Column()
     cnpj: string;

     @Column()
      cpf: string;

     @Column()
     inscricaoestadual: string;

     @Column()
     inscricaomunicipal: string;

     @Column()
     endereco: string;

     @Column()
     telefone: string;

     @Column()
     email: string;

     @Column()
     responsavel: string;

     @Column()
     ehlaboratorio: boolean;


     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Fornecedor;
