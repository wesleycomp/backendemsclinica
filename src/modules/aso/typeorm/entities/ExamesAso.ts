import ListAsosService from '@modules/aso/services/ListAsosService';
import Empresa from '@modules/empresa/typeorm/entities/Empresa';
import EspecialidadeMedica from '@modules/especialidademedica/typeorm/entities/EspecialidadeMedica';
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

    @Column()
     aso_id: string;

    @Column()
     exame_id: string;

    @Column()
     medico_id: string;

    @Column()
    dataexame: Date;

    @Column()
    datavalidadeexame: Date;

    @Column()
     ativo: boolean;

    @CreateDateColumn()
     created_at: Date;

    @UpdateDateColumn()
     updated_at: Date;

}

export default ExameAso;
