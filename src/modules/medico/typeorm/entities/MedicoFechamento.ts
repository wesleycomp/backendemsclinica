import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Medicos from "@modules/medico/typeorm/entities/Medico";
import Exame from "@modules/exame/typeorm/entities/Exame";
@Entity('medicofechamento')
class MedicoFechamento{
    @PrimaryGeneratedColumn('uuid')
    id: string

     @ManyToOne(() => Medicos)
     @JoinColumn( {name: 'medico_id'})
     medico: Medicos;
     @Column()
     medico_id: string;

    @Column({type: "decimal", precision: 10, scale: 2, default: 0})
    valor: number;

     @ManyToOne(() => Exame)
     @JoinColumn( {name: 'exame_id'})
     exame: Exame;
     @Column()
     exame_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default MedicoFechamento
