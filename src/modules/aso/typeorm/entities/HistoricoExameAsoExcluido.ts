import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('historico_exameaso_excluido')
class HistoricoExameAsoExcluido{

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     aso_id: string;

     @CreateDateColumn()
     exame_id: string;

     @Column()
     ativo: boolean;

     @CreateDateColumn()
     created_at: Date;

     @CreateDateColumn()
     updated_at: Date;


     @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valorexamesemdesconto: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valorexame: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valormedico: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valorems: number;

     @Column()
     tipopagamento_id: string;

     @Column()
     user_id: string;

     @Column()
     user_desconto: string;



     @Column()
     desconto: boolean;

}

export default HistoricoExameAsoExcluido;



