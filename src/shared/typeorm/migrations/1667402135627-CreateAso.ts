import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAso1667402135627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


        await  queryRunner.createTable(
            new Table({
                name: 'aso',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'dataemissaoaso',
                        type: 'timestamp'
                    },
                    {
                        name: 'resultado',
                        type: 'boolean'
                    },
                    {
                        name: 'temexames',
                        type: 'boolean'
                    },
                    {
                        name: 'transmissaoesocial',
                        type: 'boolean'
                    },
                    {
                        name: 'ativo',
                        type: 'boolean'
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
       await queryRunner.dropTable('aso');
    }

}
