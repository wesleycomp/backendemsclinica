import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('categoriatrabalhadores')
class CategoriaTrabalhador {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     grupo: string;

     @Column()
     codigo: string;

     @Column()
     descricao: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default CategoriaTrabalhador;

