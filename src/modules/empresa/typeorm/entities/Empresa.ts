import NaturezaJuridica from '@modules/naturezajuridica/typeorm/entities/NaturezaJuridica';
import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,ManyToOne,JoinColumn} from 'typeorm';

@Entity('empresa')
class Empresa {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @ManyToOne(() => NaturezaJuridica)
     @JoinColumn( {name: 'naturezajuridica_id'})
     procedimento: NaturezaJuridica;


     @Column()
     nome: string;

     @Column()
     cpf: string;

     @Column()
     cnpj: string;

     @Column()
     ideEmpregador: string;

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
