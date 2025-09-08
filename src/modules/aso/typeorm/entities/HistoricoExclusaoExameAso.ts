import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('historico_exclusao_exameaso')
class HistoricoExclusaoExameAso{

    @PrimaryGeneratedColumn('uuid')
     id: string;

    @Column()
     aso_id: string;

     @Column()
     exame_id: string;

     @Column()
     tipopagamento_id: string;

     @Column()
     paciente_id: string;

     @Column()
     empresa_id: string;

     @Column()
     funcao_id: string;

     @Column()
     usuario_id: string;

     @CreateDateColumn()
     created_at: Date;

     @Column({
        type: 'date',
        default: () => 'NOW()',
            })
      data_exclusao: string;

}

export default HistoricoExclusaoExameAso;
