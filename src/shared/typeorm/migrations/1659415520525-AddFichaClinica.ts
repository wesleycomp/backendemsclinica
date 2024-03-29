import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddFichaClinica1659415520525 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(
          new Table({
                    name: 'fichaclinica',
                    columns:
                    [{
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'aso_id',
                        type: 'varchar',
                    },
                    {
                        name: 'categoria',
                        type: 'varchar',
                    },
                    {
                        name: 'pergunta',
                        type: 'varchar',
                    },
                    {
                        name: 'resposta',
                        type: 'varchar',
                    },
                    {
                        name: 'observacao',
                        type: 'varchar',
                    },
                    {
                        name: 'ordem',
                        type: 'integer'
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
                    }]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
             await queryRunner.dropTable('fichaclinica');
    }

}
