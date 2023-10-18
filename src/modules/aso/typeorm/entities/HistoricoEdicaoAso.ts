import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('historico_edicao_aso')
class HistoricoEdicaoAso{

    @PrimaryGeneratedColumn('uuid')
     id: string;

    @Column()
     aso_id: string;

     @Column()
     descricao_alteracao: string;

     @Column()
     idtipopagamento_antigo: string;

     @Column()
     idtipopagamento_novo: string;

     @Column()
     idempresa_antiga: string;

     @Column()
     idempresa_novo: string;


     @Column()
     idmedico_antigo: string;

     @Column()
     idmedico_novo: string;


     @Column()
     idfuncao_antigo: string;

     @Column()
     idfuncao_novo: string;


     @Column()
     idusuario: string;

     @CreateDateColumn()
     data_alteracao: Date;

     @Column()
     idtipoaso_antigo: string;

     @Column()
     idtipoaso_novo: string;

}

export default HistoricoEdicaoAso;
