import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTipoExame1667402173675 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

       await  queryRunner.createTable(
                new Table({
                name: 'tipoexame',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'descricao',
                        type: 'varchar'
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
      await queryRunner.dropTable('tipoexame');
    }

}
