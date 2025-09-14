import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCentroCusto1526245500001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'centro_custo',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
        { name: 'nome', type: 'varchar', isNullable: false },
        { name: 'codigo', type: 'varchar', length: '30', isNullable: true, default: null },
        { name: 'ativo', type: 'boolean', isNullable: false, default: 'true' },
        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
    }));

    // Índices úteis
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_centro_custo_nome ON centro_custo (nome)');
    // Unique opcional para evitar duplicidade de código quando preenchido
    await queryRunner.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS uq_centro_custo_codigo ON centro_custo (codigo) WHERE codigo IS NOT NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS uq_centro_custo_codigo');
    await queryRunner.query('DROP INDEX IF EXISTS idx_centro_custo_nome');
    await queryRunner.dropTable('centro_custo');
  }
}

