import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateContaBancaria1526245500002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'conta_bancaria',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
        { name: 'nome', type: 'varchar', isNullable: false },
        { name: 'agencia', type: 'varchar', isNullable: false },
        { name: 'numero', type: 'varchar', isNullable: false },
        { name: 'tipo', type: 'varchar', isNullable: true },
        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
    }));

    // Evita duplicidade de mesma agência/conta
    await queryRunner.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS uq_conta_bancaria_agencia_numero ON conta_bancaria (agencia, numero)'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS uq_conta_bancaria_agencia_numero');
    await queryRunner.dropTable('conta_bancaria');
  }
}
