import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('naturezajuridica')
class NaturezaJuridica {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     descricao: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default NaturezaJuridica;

