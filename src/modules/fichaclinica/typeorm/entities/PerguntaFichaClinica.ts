import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,} from 'typeorm';

@Entity('perguntafichaclinica')
class PerguntaFichaClinica {

     @PrimaryGeneratedColumn('uuid')
     id: string;

     @Column()
     descricao: string;

     @Column()
     categoria: string;

     @Column()
     ordem: number;
     
     @Column()
     ativo: boolean;

     @CreateDateColumn()
     created_at: Date;

     @UpdateDateColumn()
     updated_at: Date;

}

export default PerguntaFichaClinica;

