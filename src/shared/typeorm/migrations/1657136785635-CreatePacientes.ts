import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePacientes1657136785635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await  queryRunner.createTable(
            new Table({
                name: 'pacientes',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'nome',
                        type: 'varchar'
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'rg',
                        type: 'varchar',
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable:false
                    },
                    {
                        name: 'datanascimento',
                        type: 'timestamp'
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }

                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropTable('pacientes');
    }

}
