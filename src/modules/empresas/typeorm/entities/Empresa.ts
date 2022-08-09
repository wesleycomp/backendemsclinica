import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('empresas')
class Empresa {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     nome: string;

     @Column()
     cnpj: string;

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
     esocial: boolean;

     @Column()
     convenio: boolean;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Empresa;
