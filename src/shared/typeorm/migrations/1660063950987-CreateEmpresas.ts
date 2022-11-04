import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateEmpresas1660063950987 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

              await  queryRunner.createTable(
                new Table({
                name: 'empresa',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'nome',
                        type: 'varchar'
                    },
                    {
                        name: 'cnpj',
                        type: 'varchar'
                    },
                    {
                        name: 'cpf',
                        type: 'varchar'
                    },
                    {
                        name: 'ideEmpregador',
                        type: 'varchar'
                    },
                    {
                        name: 'inscricaoestadual',
                        type: 'varchar',
                    },
                    {
                        name: 'inscricaomunicipal',
                        type: 'varchar',
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable:false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'responsavel',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'esocial',
                        type: 'boolean'
                    },
                    {
                        name: 'convenio',
                        type: 'boolean'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    }

                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.dropTable('empresas');
    }

}
