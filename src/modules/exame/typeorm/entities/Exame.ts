import Procedimentos from '@modules/procedimentos/typeorm/entities/Procedimentos';
import EspecialidadeMedica from '@modules/procedimentos/typeorm/entities/Procedimentos';
import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';


@Entity('exame')
class Exame {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @ManyToOne(() => Procedimentos)
     @JoinColumn( {name: 'procedimento_id'})
     procedimento: Procedimentos;

     @Column()
     procedimento_id: string;

     @Column()
     name: string;

     @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valoravista: number;

     @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valormedico: number;

     @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valorems: number;

     @Column()
     ativo: boolean;

     @Column()
     usuariocadastro: string;

     @Column()
     usuarioedicao: string;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default Exame;
