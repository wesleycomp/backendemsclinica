import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFuncao1644982499784 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        await queryRunner.createTable(new Table({
            name:"funcao",
            columns: [
                {
                    name:'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy:'uuid',
                    default:'uuid_generate_v4()'

                },
                {
                    name: 'name',
                    type: 'varchar'
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
                },


            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

          await queryRunner.dropTable('funcao');
    }

}
