import ListAsosService from '@modules/asos/services/ListAsosService';
import Empresa from '@modules/empresas/typeorm/entities/Empresa';
import EspecialidadeMedica from '@modules/especialidademedica/typeorm/entities/EspecialidadeMedica';
import Exame from '@modules/exames/typeorm/entities/Exame';
import Medico from '@modules/medicos/typeorm/entities/Medico';
import Pacientes from '@modules/pacientes/typeorm/entities/Pacientes';
import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';
import Aso from './Aso';



@Entity('examesaso')
class ExameAso {

     @PrimaryGeneratedColumn('uuid')
     id: string;

    @Column()
     aso_id: string;

    @Column()
     exame_id: string;

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

export default Aso;
