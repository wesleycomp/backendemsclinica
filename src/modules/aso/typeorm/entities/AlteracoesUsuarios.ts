import Empresa from '@modules/empresa/typeorm/entities/Empresa';

import { Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity('alteracoesusuarios')
class AlteracoesUsuarios {

     @PrimaryGeneratedColumn('uuid')
     id: string;

    @Column()
    tipoalteracao: string;

    @Column()
     usuarioaso: string;

    @Column()
     usuarioedicao: string;

    @Column()
     codigoaso: string;

    @Column()
     antigaempresa: string;

     @Column()
     novaempresa: string;

    @Column()
     antigopaciente: string;

    @Column()
     novopaciente: string;

    @CreateDateColumn()
     dataso: Date;

    @CreateDateColumn()
     dataalteracao: Date;

}

export default AlteracoesUsuarios;
