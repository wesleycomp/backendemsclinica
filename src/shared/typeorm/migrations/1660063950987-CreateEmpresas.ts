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
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'ideEmpregador',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'inscricaoestadual',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'inscricaomunicipal',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable:true
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
                        name:'observacao',
                        type:'varchar',
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
