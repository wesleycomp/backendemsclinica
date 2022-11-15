import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';
import { ColumnMetadata } from 'typeorm/metadata/ColumnMetadata';

@Entity('procedimentos')
class Procedimentos {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     name: string;

     @Column()
     codigoesocial: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Procedimentos;

