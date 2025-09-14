import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCategoriaDespesa1626246000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // UUID (mantenha igual às demais migrations do projeto)
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'categoria_despesa',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        { name: 'nome', type: 'varchar', isNullable: false },
        { name: 'codigo', type: 'varchar', isNullable: true },
        { name: 'ativo', type: 'boolean', isNullable: false, default: 'true' },

        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
    }));

    // (Opcional) índice para buscas por nome
    // await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_categoria_despesa_nome ON categoria_despesa (nome)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query('DROP INDEX IF EXISTS idx_categoria_despesa_nome');
    await queryRunner.dropTable('categoria_despesa');
  }
}
