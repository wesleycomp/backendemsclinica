import {MigrationInterface, QueryRunner, TableColumn,TableForeignKey} from "typeorm";

export class AddNaturezaJuridicaEmpresa1670529982006 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
 await queryRunner.addColumn(
            'empresa',
        new TableColumn({
            name:'naturezajuridica_id',
            type: 'uuid',
            isNullable: true,
        }),
        );


        await queryRunner.createForeignKey(
            'empresa',
            new TableForeignKey({
                name:'NaturezaJuridicaEmpresa',
                columnNames: ['naturezajuridica_id'],
                referencedTableName: 'naturezajuridica',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
                await queryRunner.dropForeignKey('empresa', 'NaturezaJuridicaEmpresa');
        await queryRunner.dropColumn('empresa', 'naturezajuridica_id');
    }

}
