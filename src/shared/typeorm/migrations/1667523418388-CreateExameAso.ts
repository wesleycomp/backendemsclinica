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
                        name: 'valorexamesemdesconto',
                        type: 'numeric',
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: 'valorexame',
                        type: 'numeric',
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: 'valormedico',
                        type: 'numeric',
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: 'valorems',
                        type: 'numeric',
                        precision: 10,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: 'ativo',
                        type: 'boolean'

                    },
                    {
                        name: 'desconto',
                        type: 'boolean',
                        isNullable: false,
                        default: false
                    },
                    {
                        name:'user_desconto',
                        type: 'varchar',
                        isNullable: false
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
