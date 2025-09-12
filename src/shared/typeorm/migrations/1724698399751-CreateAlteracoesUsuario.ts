import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAlteracoesUsuario1724698399751 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

    await  queryRunner.createTable(
            new Table({
                name: 'alteracoesusuarios',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'tipoalteracao',
                        type: 'varchar'
                    },
                    {
                        name: 'usuarioaso',
                        type: 'varchar'

                    },
                    {
                        name: 'usuarioedicao',
                        type: 'varchar',
                    },
                    {
                        name: 'codigoaso',
                        type: 'varchar',
                    },
                    {
                        name: 'antigaempresa',
                        type: 'varchar'
                    },
                    {
                        name: 'novaempresa',
                        type: 'varchar'
                    },
                    {
                        name: 'antigopaciente',
                        type: 'varchar'
                    },
                    {
                        name: 'novopaciente',
                        type: 'varchar'
                    },
                    {
                        name: 'dataso',
                        type: 'date',
                    },
                    {
                        name: 'dataalteracao',
                        type: 'date',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('alteracoesusuarios');
    }

}
