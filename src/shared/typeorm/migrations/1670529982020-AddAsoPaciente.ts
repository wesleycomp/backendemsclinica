import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddAsoPaciente1670529982020 implements MigrationInterface {

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
                referencedTableName: 'paciente',
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
                referencedTableName: 'empresa',
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
                referencedTableName: 'medico',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );






      await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'tipopagamento_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

       await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({
                name:'TipoPagamentoAso',
                columnNames: ['tipopagamento_id'],
                referencedTableName: 'tipopagamento',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );




      await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'funcao_id',
            type: 'uuid',
            isNullable: true,
        }),
        );
       await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({
                name:'FuncaoPacienteAso',
                columnNames: ['funcao_id'],
                referencedTableName: 'funcao',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );

   await queryRunner.addColumn(
            'aso',
        new TableColumn({
            name:'user_id',
            type: 'uuid',
            isNullable: true,
        }),
        );
       await queryRunner.createForeignKey(
            'aso',
            new TableForeignKey({
                name:'UserPacienteAso',
                columnNames: ['user_id'],
                referencedTableName: 'user',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

         await queryRunner.dropForeignKey('aso', 'PacienteAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'EmpresaAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'TipoAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'MedicoAsoPaciente');
         await queryRunner.dropForeignKey('aso', 'TipoPagamentoAso');
         await queryRunner.dropForeignKey('aso', 'FuncaoPacienteAso');
         await queryRunner.dropForeignKey('aso', 'UserPacienteAso');

         await queryRunner.dropColumn('aso', 'user_id');
         await queryRunner.dropColumn('aso', 'paciente_id');
         await queryRunner.dropColumn('aso', 'empresa_id');
         await queryRunner.dropColumn('aso', 'tipoaso_id');
         await queryRunner.dropColumn('aso', 'medico_id');
         await queryRunner.dropColumn('aso', 'tipopagamento_id');
         await queryRunner.dropColumn('aso', 'funcao_id');
    }

}
