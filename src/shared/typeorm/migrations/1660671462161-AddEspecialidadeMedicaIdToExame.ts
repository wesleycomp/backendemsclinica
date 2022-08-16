import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddEspecialidadeMedicaIdToExame1660671462161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'exame',
        new TableColumn({
            name:'especialidademedica_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

        await queryRunner.createForeignKey(
            'exame',
            new TableForeignKey({
                name:'EspecialidadesExame',
                columnNames: ['especialidademedica_id'],
                referencedTableName: 'especialidademedica',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('exame', 'EspecialidadesExame');
        await queryRunner.dropColumn('exame', 'especialidademedica_id');
    }

}
