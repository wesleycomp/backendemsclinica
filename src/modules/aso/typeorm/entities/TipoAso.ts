import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('tipoaso')
class TipoAso{

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

export default TipoAso;

