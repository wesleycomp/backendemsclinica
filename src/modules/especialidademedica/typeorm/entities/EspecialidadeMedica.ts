import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('especialidademedica')
class EspecialidadeMedica {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     name: string;

     cbo: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default EspecialidadeMedica;

