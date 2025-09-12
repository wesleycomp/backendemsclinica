import { Column,
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

   @Column()
     dataso: Date;

   @Column()
     dataalteracao: Date;

}

export default AlteracoesUsuarios;
