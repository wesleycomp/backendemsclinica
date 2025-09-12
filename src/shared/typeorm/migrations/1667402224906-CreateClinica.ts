import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateClinica1667402224906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
  await  queryRunner.createTable(
                new Table({
                name: 'clinica',
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
      await queryRunner.dropTable('clinicas');
    }

}
