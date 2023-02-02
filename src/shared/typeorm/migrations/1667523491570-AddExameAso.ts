import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddExameAso1667523491570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'exameaso',
        new TableColumn({
            name:'aso_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

       await queryRunner.addColumn(
            'exameaso',
        new TableColumn({
            name:'exame_id',
            type: 'uuid',
            isNullable: true,
        }),
        );


        await queryRunner.createForeignKey(
            'exameaso',
            new TableForeignKey({
                name:'AsoPacienteExame',
                columnNames: ['aso_id'],
                referencedTableName: 'aso',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );

        await queryRunner.createForeignKey(
            'exameaso',
            new TableForeignKey({
                name:'ExameAsoPaciente',
                columnNames: ['exame_id'],
                referencedTableName: 'exame',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );





    }

    public async down(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.dropForeignKey('exameaso', 'AsoPacienteExame');
         await queryRunner.dropForeignKey('exameaso', 'ExameAsoPaciente');
         await queryRunner.dropColumn('exameaso', 'aso_id');
         await queryRunner.dropColumn('exameaso', 'exame_id');

    }

}
