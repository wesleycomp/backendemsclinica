import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateFechamentoAsos1726245300002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'fechamento_asos',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },

        { name: 'fechamento_id', type: 'uuid', isNullable: false },
        { name: 'aso_id', type: 'uuid', isNullable: false },

        { name: 'valor', type: 'numeric', precision: 12, scale: 2, isNullable: false, default: '0' },

        { name: 'created_at', type: 'timestamp with time zone', default: 'now()' },
        { name: 'updated_at', type: 'timestamp with time zone', default: 'now()' },
      ],
      uniques: [
        {
          name: 'UQ_fechamento_asos_fechamento_aso',
          columnNames: ['fechamento_id', 'aso_id'],
        },
      ],
    }));

    // FK fechamento_id -> fechamento(id)
    await queryRunner.createForeignKey('fechamento_asos', new TableForeignKey({
      name: 'FKFechamentoAsos_Fechamento',
      columnNames: ['fechamento_id'],
      referencedTableName: 'fechamento',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE', // apaga os vínculos se o fechamento for removido
    }));

    // FK aso_id -> aso(id)
    await queryRunner.createForeignKey('fechamento_asos', new TableForeignKey({
      name: 'FKFechamentoAsos_Aso',
      columnNames: ['aso_id'],
      referencedTableName: 'aso',
      referencedColumnNames: ['id'],
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    }));

    // Índices
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_fechamento_asos_fechamento ON fechamento_asos (fechamento_id)');
    await queryRunner.query('CREATE INDEX IF NOT EXISTS idx_fechamento_asos_aso ON fechamento_asos (aso_id)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX IF EXISTS idx_fechamento_asos_aso');
    await queryRunner.query('DROP INDEX IF EXISTS idx_fechamento_asos_fechamento');

    await queryRunner.dropForeignKey('fechamento_asos', 'FKFechamentoAsos_Aso');
    await queryRunner.dropForeignKey('fechamento_asos', 'FKFechamentoAsos_Fechamento');

    await queryRunner.dropUniqueConstraint('fechamento_asos', 'UQ_fechamento_asos_fechamento_aso');

    await queryRunner.dropTable('fechamento_asos');
  }
}
