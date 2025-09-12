import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('nacionalidade')
class Nacionalidade {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     nomepais: string;

     @Column()
     codigo: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Nacionalidade;

