import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddTipoAsoAso1668630053132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
           await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'tipoaso_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

        await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({

                name:'TipoAsoAso',
                columnNames: ['tipoaso_id'],
                referencedTableName: 'tipoaso',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',

            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('aso', 'TipoAsoAso');
        await queryRunner.dropColumn('aso', 'tipoaso_id');
    }

}
