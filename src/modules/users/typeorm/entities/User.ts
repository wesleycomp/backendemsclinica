import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('user')
class User{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    perfil: string

    @Column({default: false})
    master: boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User
