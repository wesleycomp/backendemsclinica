import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class AddPerguntaFichaClinica1679415528653 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.createTable(
          new Table({
                    name: 'perguntafichaclinica',
                    columns:
                    [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'descricao',
                        type: 'varchar',
                    },
                     {
                        name: 'categoria',
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
                    },
                    {
                        name: 'ativo',
                        type: 'boolean',
                        default: 'true',
                    },
                    {
                        name: 'ordem',
                        type: 'integer'
                    }
                    ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                   await queryRunner.dropTable('perguntafichaclinica');
    }

}
