import Empresa from '@modules/empresa/typeorm/entities/Empresa';
import EspecialidadeMedica from '@modules/procedimentos/typeorm/entities/Procedimentos';
import Exame from '@modules/exame/typeorm/entities/Exame';
import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,JoinColumn,ManyToOne} from 'typeorm';
import User from '@modules/users/typeorm/entities/User';

@Entity('convenioempresa')
class ConvenioEmpresa{

     @PrimaryGeneratedColumn('uuid')
     id: string;

          @ManyToOne(() => Empresa)
          @JoinColumn( {name: 'empresa_id'})
          empresa: Empresa;

          @Column()
          empresa_id: string;

          @ManyToOne(() => Exame)
          @JoinColumn( {name: 'exame_id'})
          exame: Exame;

          @Column()
          exame_id: string;



          @ManyToOne(() => User)
          @JoinColumn( {name: 'user_id'})
          user: Exame;


            @Column()
            user_id: string;


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

export default ConvenioEmpresa;

