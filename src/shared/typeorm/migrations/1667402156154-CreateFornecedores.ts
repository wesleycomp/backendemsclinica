import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFornecedores1667402156154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

              await  queryRunner.createTable(
                new Table({
                name: 'fornecedor',
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
                        isNullable:false
                    },
                    {
                        name: 'ehlaboratorio',
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
         await queryRunner.dropTable('fornecedor');
    }

}
