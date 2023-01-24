import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateExameAso1667523418388 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

  await  queryRunner.createTable(
            new Table({
                name: 'exameaso',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'dataexame',
                        type: 'timestamp'
                    },
                    {
                        name: 'datavalidadeexame',
                        type: 'timestamp'
                    },
                    {
                        name: 'ativo',
                        type: 'boolean'
                    },
                    {
                        name:'usuariocadastro',
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
                    }

                ]
            })
        )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
     await queryRunner.dropTable('exameaso');
    }

}
