import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMedicos1667402061251 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {


      await  queryRunner.createTable(
            new Table({
                name: 'medicos',
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
                        name: 'cpf',
                        type: 'varchar',
                        isUnique: true
                    },
                    {
                        name: 'rg',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'crm',
                        type: 'varchar',
                        isNullable:false
                    },
                     {
                        name: 'ufcrm',
                        type: 'varchar',
                        isNullable:false
                    },
                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'datanascimento',
                        type: 'timestamp'
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable:true
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
      await queryRunner.dropTable('medicos');
    }

}
