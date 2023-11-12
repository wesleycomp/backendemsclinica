import Empresa from '@modules/empresa/typeorm/entities/Empresa';
import EspecialidadeMedica from '@modules/procedimentos/typeorm/entities/Procedimentos';
import Funcao from '@modules/funcao/typeorm/entities/Funcao';
import Medico from '@modules/medico/typeorm/entities/Medico';
import Pacientes from '@modules/paciente/typeorm/entities/Paciente';
import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';
import TipoAso from './TipoAso';
import User from '@modules/users/typeorm/entities/User';
import TipoPagamento from '@modules/tipopagamento/typeorm/entities/TipoPagamento';
import MedicoExaminador from '@modules/medico/typeorm/entities/MedicoExaminador'

@Entity('aso')
class Aso {

     @PrimaryGeneratedColumn('uuid')
     id: string;

    @Column()
    codigoaso: Number;

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

    @ManyToOne(() => Funcao)
    @JoinColumn( {name: 'funcao_id'})
     funcao: Funcao;
    @Column()
     funcao_id: string;


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


      @ManyToOne(() => MedicoExaminador)
    @JoinColumn( {name: 'medicoexaminador_id'})
     medicoexaminador: MedicoExaminador;
    @Column()
     medicoexaminador_id: string;


    @ManyToOne(() => User)
    @JoinColumn( {name: 'user_id'})
     user: User;
    @Column()
     user_id: string;


   @ManyToOne(() => TipoPagamento)
    @JoinColumn( {name: 'tipopagamento_id'})
     tipopagamento: TipoPagamento;
    @Column()
     tipopagamento_id: string;


     @Column()
     user_edit: string;

    @Column()
     resultado: string;


    @Column()
     transmissaoesocial: boolean;

    @Column()
     ativo: boolean;

    @CreateDateColumn()
     created_at: Date;

    @UpdateDateColumn()
     updated_at: Date;

     @Column({
        type: 'date',
        default: () => 'NOW()',
            })
      data_cadastro_exame: string;

}

export default Aso;
