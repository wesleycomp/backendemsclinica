import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('funcao')
class Funcao {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     name: string;

     @Column()
     cbo: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Funcao;

