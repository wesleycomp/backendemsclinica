import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('historico_aso_excluida')
class HistoricoAsoExcluida{

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     aso_id: string;

     @CreateDateColumn()
     dataemissaoaso: Date;

     @Column()
     paciente_id: string;

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

     @Column()
     user_id: string;

     @Column()
     user_edit: string;

     @Column()
     codigoaso: Number;

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



