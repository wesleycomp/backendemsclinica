import Aso from '@modules/aso/typeorm/entities/Aso';
import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,ManyToOne,JoinColumn} from 'typeorm';

@Entity('fichaclinica')
class FichaClinica {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @ManyToOne(() => Aso)
     @JoinColumn( {name: 'aso_id'})
     aso: Aso;
     @Column()
     aso_id: string;

     @Column()
     categoria: string;

     @Column()
     pergunta: string;

     @Column()
     resposta: string;

     @Column()
     observacao: string;

     @Column()
     ordem: number;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default FichaClinica;
