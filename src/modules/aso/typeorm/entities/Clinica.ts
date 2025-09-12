import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';


@Entity('clinica')
class Clinica {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     descricao: string;

     @Column()
     ativo: boolean;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Clinica;
