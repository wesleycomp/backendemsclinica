import User from '@modules/users/typeorm/entities/User';

import { Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('historico_exameaso_excluido')
class HistoricoExameAsoExcluido{

     @PrimaryGeneratedColumn('uuid')
     id: string;


    @Column()
     user_id: string;

     @Column()
     aso_id: string;

     @Column()
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
     user_desconto: string;

     @Column()
     desconto: boolean;

      @Column()
     motivo: string;


}

export default HistoricoExameAsoExcluido;



