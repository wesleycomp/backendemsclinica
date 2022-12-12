import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddPacienteEmpresa1667413482952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


      await queryRunner.addColumn(
            'paciente',
        new TableColumn({
            name:'empresa_id',
            type: 'uuid',
            isNullable: true,
        }),
        );
        await queryRunner.createForeignKey(
            'paciente',
            new TableForeignKey({
                name:'EmpresaPaciente',
                columnNames: ['empresa_id'],
                referencedTableName: 'empresa',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );



       await queryRunner.addColumn(
            'paciente',
        new TableColumn({
            name:'funcao_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

           await queryRunner.createForeignKey(
            'paciente',
            new TableForeignKey({
                name:'FuncaoPaciente',
                columnNames: ['funcao_id'],
                referencedTableName: 'funcao',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );



      await queryRunner.addColumn(
            'paciente',
        new TableColumn({
            name:'categoriatrabalhador_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

           await queryRunner.createForeignKey(
            'paciente',
            new TableForeignKey({
                name:'CategoriaTrabalhadorPaciente',
                columnNames: ['categoriatrabalhador_id'],
                referencedTableName: 'categoriatrabalhador',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );


  await queryRunner.addColumn(
            'paciente',
        new TableColumn({
            name:'nacionalidade_id',
            type: 'uuid',
            isNullable: true,
        }),
        );



           await queryRunner.createForeignKey(
            'paciente',
            new TableForeignKey({
                name:'NacionalidadePaciente',
                columnNames: ['nacionalidade_id'],
                referencedTableName: 'nacionalidade',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropForeignKey('paciente', 'EmpresaPaciente');
         await queryRunner.dropForeignKey('paciente', 'FuncaoPaciente');
         await queryRunner.dropForeignKey('paciente', 'CategoriaTrabalhadorPaciente');
         await queryRunner.dropForeignKey('paciente', 'NacionalidadePaciente');


        await queryRunner.dropColumn('paciente', 'empresa_id');
        await queryRunner.dropColumn('paciente', 'funcao_id');
        await queryRunner.dropColumn('paciente', 'categoriatrabalhador_id');
        await queryRunner.dropColumn('paciente', 'nacionalidade_id');
    }

}
