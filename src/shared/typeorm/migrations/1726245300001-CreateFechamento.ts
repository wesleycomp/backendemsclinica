import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFechamento1726245300001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // UUID (ajuste se você preferir pgcrypto/gen_random_uuid())
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'fechamento',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        { name: 'empresa_id', type: 'uuid', isNullable: false },

        { name: 'data_inicial', type: 'date', isNullable: false },
        { name: 'data_final', type: 'date', isNullable: false },

        { name: 'criado_por', type: 'uuid', isNullable: false },

        { name: 'valor_total', type: 'numeric', precision: 12, scale: 2, isNullable: false, default: '0' },
        { name: 'status', type: 'varchar', length: '20', isNullable: false, default: `'aberto'` },

        { name: 'valor_pago', type: 'numeric', precision: 12, scale: 2, isNullable: false, default: '0' },

        { name: 'data_fechamento', type: 'date', isNullable: true },
        { name: 'data_pagamento', type: 'timestamp with time zone', isNullable: true },

        { name: 'observacao', type: 'varchar', length: '255', isNullable: true },

        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
    }));

    // FK empresa_id -> empresa(id)
    await queryRunner.createForeignKey('fechamento', new TableForeignKey({
      name: 'FKFechamentoEmpresa',
      columnNames: ['empresa_id'],
      referencedTableName: 'empresa',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    }));

    // FK criado_por -> usuarios(id)  (troque para 'users' se for o seu caso)
await queryRunner.createForeignKey('fechamento', new TableForeignKey({
  name: 'FKFechamentoUsuario',
  columnNames: ['criado_por'],
  referencedTableName: 'user',   // ← trocado para 'user'
  referencedColumnNames: ['id'],
  onUpdate: 'CASCADE',
  onDelete: 'RESTRICT',
}));

    // Índices úteis
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS idx_fechamento_periodo_empresa ON fechamento (empresa_id, data_inicial, data_final)'
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS idx_fechamento_data_fechamento ON fechamento (data_fechamento)'
    );
    await queryRunner.query(
      'CREATE INDEX IF NOT EXISTS idx_fechamento_status ON fechamento (status)'
    );

    // CHECK de status
    await queryRunner.query(
      "ALTER TABLE fechamento ADD CONSTRAINT CHK_fechamento_status CHECK (status IN ('aberto','parcialmente_pago','pago','cancelado'))"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE fechamento DROP CONSTRAINT IF EXISTS CHK_fechamento_status');
    await queryRunner.query('DROP INDEX IF EXISTS idx_fechamento_status');
    await queryRunner.query('DROP INDEX IF EXISTS idx_fechamento_data_fechamento');
    await queryRunner.query('DROP INDEX IF EXISTS idx_fechamento_periodo_empresa');

    await queryRunner.dropForeignKey('fechamento', 'FKFechamentoUsuario');
    await queryRunner.dropForeignKey('fechamento', 'FKFechamentoEmpresa');

    await queryRunner.dropTable('fechamento');
    // (não removo a EXTENSÃO uuid-ossp no down para não afetar outras tabelas que usem UUID)
  }
}
