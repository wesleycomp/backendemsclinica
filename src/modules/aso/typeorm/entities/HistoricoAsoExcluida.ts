import { Column,
  CreateDateColumn,
  Entity,ManyToOne,JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';
  import Empresa from '@modules/empresa/typeorm/entities/Empresa';
  import Pacientes from '@modules/paciente/typeorm/entities/Paciente';
  import User from '@modules/users/typeorm/entities/User';
  import TipoPagamento from '@modules/tipopagamento/typeorm/entities/TipoPagamento';

@Entity('historico_aso_excluida')
class HistoricoAsoExcluida{

     @PrimaryGeneratedColumn('uuid')
     id: string;


     @Column()
     aso_id: string;

     @CreateDateColumn()
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

     @Column()
     funcao_id: string;

     @Column()
     tipoaso_id: string;

     @Column()
     medico_id: string;


     @Column()
     resultado: string;

     @Column()
     transmissaoesocial: boolean;

     @Column()
     ativo: boolean;

     @CreateDateColumn()
     created_at: Date;

    @CreateDateColumn()
     updated_at: Date;

    @ManyToOne(() => User)
    @JoinColumn( {name: 'user_id'})
     user: User;
    @Column()
     user_id: string;

     @Column()
     user_edit: string;

     @Column()
     codigoaso: Number;

   @ManyToOne(() => TipoPagamento)
    @JoinColumn( {name: 'tipopagamento_id'})
     tipopagamento: TipoPagamento;
    @Column()
     tipopagamento_id: string;

     @CreateDateColumn()
     data_criacao: Date;

    @Column()
     user_exclusao: string;

    @Column({
                type: 'date',
                default: () => 'NOW()',
            })
     data_exclusao: string;

}

export default HistoricoAsoExcluida;



