import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddPacienteEmpresa1667413482952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


      await queryRunner.addColumn(
            'pacientes',
        new TableColumn({
            name:'empresa_id',
            type: 'uuid',
            isNullable: true,
        }),
        );
        await queryRunner.createForeignKey(
            'pacientes',
            new TableForeignKey({
                name:'EmpresaPaciente',
                columnNames: ['empresa_id'],
                referencedTableName: 'empresas',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );



       await queryRunner.addColumn(
            'pacientes',
        new TableColumn({
            name:'funcao_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

           await queryRunner.createForeignKey(
            'pacientes',
            new TableForeignKey({
                name:'FuncaoPaciente',
                columnNames: ['funcao_id'],
                referencedTableName: 'funcao',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );



      await queryRunner.addColumn(
            'pacientes',
        new TableColumn({
            name:'categoriatrabalhador_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

           await queryRunner.createForeignKey(
            'pacientes',
            new TableForeignKey({
                name:'CategoriaTrabalhadorPaciente',
                columnNames: ['categoriatrabalhador_id'],
                referencedTableName: 'categoriatrabalhadores',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropForeignKey('pacientes', 'EmpresaPaciente');
         await queryRunner.dropForeignKey('pacientes', 'FuncaoPaciente');
         await queryRunner.dropForeignKey('pacientes', 'CategoriaTrabalhadorPaciente');

        await queryRunner.dropColumn('pacientes', 'empresa_id');
        await queryRunner.dropColumn('pacientes', 'funcao_id');
        await queryRunner.dropColumn('pacientes', 'categoriatrabalhador_id');

    }

}
