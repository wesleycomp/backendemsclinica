import ListAsosService from '@modules/aso/services/ListAsosService';
import Empresa from '@modules/empresa/typeorm/entities/Empresa';
import EspecialidadeMedica from '@modules/procedimentos/typeorm/entities/Procedimentos';
import Exame from '@modules/exame/typeorm/entities/Exame';
import Medico from '@modules/medico/typeorm/entities/Medico';
import Pacientes from '@modules/paciente/typeorm/entities/Paciente';
import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';
import Aso from './Aso';



@Entity('exameaso')
class ExameAso {

     @PrimaryGeneratedColumn('uuid')
     id: string;

    @ManyToOne(() => Aso)
    @JoinColumn( {name: 'aso_id'})
     aso: Aso;
    @Column()
     aso_id: string;


    @ManyToOne(() => Exame)
    @JoinColumn( {name: 'exame_id'})
     exame: Exame;
    @Column()
     exame_id: string;


    @Column()
     ativo: boolean;

    @CreateDateColumn()
     created_at: Date;

    @UpdateDateColumn()
     updated_at: Date;

}

export default ExameAso;
