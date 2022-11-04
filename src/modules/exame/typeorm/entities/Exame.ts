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

     @Column()
     codigoesocial: string;


     @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valoravista: number;

     @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valormedico: number;

     @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valorems: number;

     @Column()
     ativo: boolean;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Exame;
