import EspecialidadeMedica from '@modules/especialidademedica/typeorm/entities/EspecialidadeMedica';
import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';


@Entity('exame')
class Exame {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @ManyToOne(() => EspecialidadeMedica)
     @JoinColumn( {name: 'especialidademedica_id'})
     especialidademedica: EspecialidadeMedica;

     @Column()
     especialidademedica_id: string;

     @Column()
     name: string;

     @Column('decimal')
     valoravista: number;

     @Column('decimal')
     valormedico: number;

     @Column('decimal')
     valorems: number;

     @Column()
     ativo: boolean;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Exame;
