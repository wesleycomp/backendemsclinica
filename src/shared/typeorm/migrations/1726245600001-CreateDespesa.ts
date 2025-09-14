import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateDespesa1726245600001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(new Table({
      name: 'despesa',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },

        { name: 'descricao', type: 'varchar', length: '255', isNullable: false },

        { name: 'fornecedor_id', type: 'uuid', isNullable: true },
        { name: 'categoria_id', type: 'uuid', isNullable: true },
        { name: 'centro_custo_id', type: 'uuid', isNullable: true },
        { name: 'forma_pagamento_id', type: 'uuid', isNullable: true },
        { name: 'conta_bancaria_id', type: 'uuid', isNullable: true },

        { name: 'valor', type: 'numeric', precision: 12, scale: 2, isNullable: false, default: '0' },
        { name: 'status', type: 'varchar', length: '20', isNullable: false, default: `'a_vencer'` },

        { name: 'data_emissao', type: 'date', isNullable: true },
        { name: 'data_vencimento', type: 'date', isNullable: false },
        { name: 'data_pagamento', type: 'timestamp with time zone', isNullable: true },

        { name: 'competencia', type: 'varchar', length: '7', isNullable: true },

        { name: 'parcela', type: 'integer', isNullable: false, default: 1 },
        { name: 'total_parcelas', type: 'integer', isNullable: false, default: 1 },
        { name: 'despesa_agrupadora_id', type: 'uuid', isNullable: true },

        { name: 'tipo_dre', type: 'varchar', length: '30', isNullable: true },
        { name: 'dre_categoria', type: 'varchar', length: '60', isNullable: true },
        { name: 'exibir_dre', type: 'boolean', isNullable: false, default: false },

        { name: 'conciliado', type: 'boolean', isNullable: false, default: false },
        { name: 'linha_extrato_id', type: 'uuid', isNullable: true },

        { name: 'is_custo_fixo', type: 'boolean', isNullable: false, default: false },
        { name: 'aging', type: 'integer', isNullable: false, default: 0 },
        { name: 'data_original', type: 'date', isNullable: true },

        { name: 'observacao', type: 'varchar', length: '255', isNullable: true },

        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
    }));

    // FKs (ajuste referencedTableName se o seu nome for outro)
    await queryRunner.createForeignKey('despesa', new TableForeignKey({
      name: 'FKDespesaFornecedor',
      columnNames: ['fornecedor_id'],
      referencedTableName: 'fornecedor', // ou 'fornecedores'
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('despesa', new TableForeignKey({
      name: 'FKDespesaCategoria',
      columnNames: ['categoria_id'],
      referencedTableName: 'categoria_despesa',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('despesa', new TableForeignKey({
      name: 'FKDespesaCentroCusto',
      columnNames: ['centro_custo_id'],
      referencedTableName: 'centro_custo', // ou 'centro_custo'
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('despesa', new TableForeignKey({
      name: 'FKDespesaFormaPagamento',
      columnNames: ['forma_pagamento_id'],
      referencedTableName: 'tipopagamento',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    await queryRunner.createForeignKey('despesa', new TableForeignKey({
      name: 'FKDespesaContaBancaria',
      columnNames: ['conta_bancaria_id'],
      referencedTableName: 'conta_bancaria',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    // self-FK para agrupar parcelas
    await queryRunner.createForeignKey('despesa', new TableForeignKey({
      name: 'FKDespesaAgrupadora',
      columnNames: ['despesa_agrupadora_id'],
      referencedTableName: 'despesa',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    }));

    // Índices úteis
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_despesa_vencimento ON despesa (data_vencimento)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_despesa_status ON despesa (status)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_despesa_fornecedor ON despesa (fornecedor_id)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_despesa_conta_conciliado ON despesa (conta_bancaria_id, conciliado)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_despesa_competencia ON despesa (competencia)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS idx_despesa_competencia');
    await queryRunner.query('DROP INDEX IF EXISTS idx_despesa_conta_conciliado');
    await queryRunner.query('DROP INDEX IF EXISTS idx_despesa_fornecedor');
    await queryRunner.query('DROP INDEX IF EXISTS idx_despesa_status');
    await queryRunner.query('DROP INDEX IF EXISTS idx_despesa_vencimento');

    await queryRunner.dropForeignKey('despesa', 'FKDespesaAgrupadora');
    await queryRunner.dropForeignKey('despesa', 'FKDespesaContaBancaria');
    await queryRunner.dropForeignKey('despesa', 'FKDespesaFormaPagamento');
    await queryRunner.dropForeignKey('despesa', 'FKDespesaCentroCusto');
    await queryRunner.dropForeignKey('despesa', 'FKDespesaCategoria');
    await queryRunner.dropForeignKey('despesa', 'FKDespesaFornecedor');

    await queryRunner.dropTable('despesa');
  }
}
