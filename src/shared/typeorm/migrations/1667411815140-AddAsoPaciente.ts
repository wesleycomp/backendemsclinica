import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddAsoPaciente1667411815140 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {



    await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'paciente_id',
            type: 'uuid',
            isNullable: true,
        }),
        );
        await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({
                name:'PacienteAsoPaciente',
                columnNames: ['paciente_id'],
                referencedTableName: 'pacientes',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );



      await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'empresa_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

           await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({
                name:'EmpresaAsoPaciente',
                columnNames: ['empresa_id'],
                referencedTableName: 'empresas',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );


        await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'tipoexame_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

        await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({
                name:'TipoExameAsoPaciente',
                columnNames: ['tipoexame_id'],
                referencedTableName: 'tipoexame',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );


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
                name:'TipoAsoPaciente',
                columnNames: ['tipoaso_id'],
                referencedTableName: 'tipoaso',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );



      await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'medico_id',
            type: 'uuid',
            isNullable: true,
        }),
        );
       await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({
                name:'MedicoAsoPaciente',
                columnNames: ['medico_id'],
                referencedTableName: 'medicos',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.dropForeignKey('aso', 'PacienteAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'EmpresaAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'TipoExameAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'TipoAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'MedicoAsoPaciente');

         await queryRunner.dropColumn('aso', 'paciente_id');
         await queryRunner.dropColumn('aso', 'empresa_id');
         await queryRunner.dropColumn('aso', 'tipoexame_id');
         await queryRunner.dropColumn('aso', 'tipoaso_id');
         await queryRunner.dropColumn('aso', 'medico_id');

    }

}
