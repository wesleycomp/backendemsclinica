import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateNacionalidade1654882090510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
        new Table({
        name: 'nacionalidade',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'nomepais',
            type: 'varchar',
          },

           {
            name: 'codigo',
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
    );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.dropTable('nacionalidade');
    }

}
