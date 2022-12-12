import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";


export class AddConvenioEmpresa1664134205704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.addColumn(
            'convenioempresa',
        new TableColumn({
            name:'empresa_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

       await queryRunner.addColumn(
            'convenioempresa',
        new TableColumn({
            name:'exame_id',
            type: 'uuid',
            isNullable: true,
        }),
        );

           await queryRunner.createForeignKey(
            'convenioempresa',
            new TableForeignKey({
                name:'EmpresaConvenioEmpresa',
                columnNames: ['empresa_id'],
                referencedTableName: 'empresa',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );



       await queryRunner.createForeignKey(
            'convenioempresa',
            new TableForeignKey({
                name:'ExameConvenioEmpresa',
                columnNames: ['exame_id'],
                referencedTableName: 'exame',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.dropForeignKey('convenioempresa', 'EmpresaConvenioEmpresa');
         await queryRunner.dropForeignKey('convenioempresa', 'ExameConvenioEmpresa');
         await queryRunner.dropColumn('convenioempresa', 'empresa_id');
         await queryRunner.dropColumn('convenioempresa', 'exame_id');
    }

}
