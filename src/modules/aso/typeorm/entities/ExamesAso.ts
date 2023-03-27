import Exame from '@modules/exame/typeorm/entities/Exame';

import { Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';
import Aso from './Aso';

@Entity('exameaso')
class ExameAso {

     @PrimaryGeneratedColumn('uuid')
     id: string;

    @ManyToOne(() => Aso)
    @JoinColumn( {name: 'aso_id'})
     aso: Aso;
    @Column()
     aso_id: string;

    @ManyToOne(() => Exame)
    @JoinColumn( {name: 'exame_id'})
     exame: Exame;
    @Column()
     exame_id: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valorexame: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valormedico: number;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
     valorems: number;

    @Column()
     ativo: boolean;

    @CreateDateColumn()
     created_at: Date;

    @UpdateDateColumn()
     updated_at: Date;

}

export default ExameAso;
