import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';

@Entity('asoexcluidas')
class AsosExcluidas{

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     aso_id: string;

     @Column()
     user_id: string;


     @Column()
     motivo: string;

     @CreateDateColumn()
     created_at: Date;


}

export default AsosExcluidas;

