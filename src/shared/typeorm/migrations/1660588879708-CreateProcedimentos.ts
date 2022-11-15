import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEspecialidadeMedica1660588879708 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
        new Table({
        name: 'procedimentos',
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
            name: 'codigoesocial',
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
        await queryRunner.dropTable('especialidademedica');
    }

}
