import Empresa from '@modules/empresas/typeorm/entities/Empresa';
import EspecialidadeMedica from '@modules/especialidademedica/typeorm/entities/EspecialidadeMedica';
import Exame from '@modules/exames/typeorm/entities/Exame';
import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,JoinColumn,ManyToOne} from 'typeorm';

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

