import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategoriaTrabalhadores1667402101672 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
           await  queryRunner.createTable(
            new Table({
                name: 'categoriatrabalhador',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'grupo',
                        type: 'varchar'
                    },
                    {
                        name: 'codigo',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
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
             await queryRunner.dropTable('categoriatrabalhadores');

    }

}
