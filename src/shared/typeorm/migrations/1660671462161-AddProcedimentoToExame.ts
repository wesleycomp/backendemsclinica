import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddEspecialidadeMedicaIdToExame1660671462161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'exame',
        new TableColumn({
            name:'procedimento_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

        await queryRunner.createForeignKey(
            'exame',
            new TableForeignKey({

                name:'ProcedimentosExames',
                columnNames: ['procedimento_id'],
                referencedTableName: 'procedimentos',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',

            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('exame', 'ProcedimentosExames');
        await queryRunner.dropColumn('exame', 'procedimento_id');
    }

}
