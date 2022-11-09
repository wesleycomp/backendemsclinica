import Empresa from '@modules/empresa/typeorm/entities/Empresa';
import EspecialidadeMedica from '@modules/especialidademedica/typeorm/entities/EspecialidadeMedica';
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
import TipoAso from './TipoAso';
import TipoExame from './TipoExame';


@Entity('aso')
class Aso {

     @PrimaryGeneratedColumn('uuid')
     id: string;
    @Column()
    dataemissaoaso: Date;

    @ManyToOne(() => Pacientes)
    @JoinColumn( {name: 'paciente_id'})
     paciente: Pacientes;
    @Column()
     paciente_id: string;

    @ManyToOne(() => Empresa)
    @JoinColumn( {name: 'empresa_id'})
     empresa: Empresa;
    @Column()
     empresa_id: string;


    @ManyToOne(() => TipoExame)
    @JoinColumn( {name: 'tipoexame_id'})
     tipoexame: TipoExame;
    @Column()
     tipoexame_id: string;


    @ManyToOne(() => TipoAso)
    @JoinColumn( {name: 'tipoaso_id'})
     tipoaso: TipoAso;
    @Column()
     tipoaso_id: string;


    @ManyToOne(() => Medico)
    @JoinColumn( {name: 'medico_id'})
     medico: Medico;
    @Column()
     medico_id: string;

     @Column()
     tipopagamento: string;

    @Column()
     resultado: string;

    @Column()
     temexames: boolean;

    @Column()
     transmissaoesocial: boolean;

    @Column()
     ativo: boolean;

    @CreateDateColumn()
     created_at: Date;

    @UpdateDateColumn()
     updated_at: Date;

}

export default Aso;
