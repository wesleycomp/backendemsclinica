import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateExame1660595071545 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
        new Table({
        name: 'exame',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'name',
            type: 'varchar',
          },

          {
            name: 'valoravista',
            type: 'number',
          },

          {
            name: 'valormedico',
            type: 'number',
          },

          {
            name: 'valorems',
            type: 'number',
          },
           {
            name: 'ativo',
            type: 'boolean',
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
    );
  }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('exame');
    }

}
