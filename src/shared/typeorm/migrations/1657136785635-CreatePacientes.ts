import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePacientes1657136785635 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await  queryRunner.createTable(
            new Table({
                name: 'paciente',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },

                     {
                        name: 'matricula',
                        type: 'varchar',
                         isNullable:false
                    },

                    {
                        name: 'dataentradaempresa',
                        type: 'date',
                        isNullable:false
                    },
                    {
                        name: 'descricaoatividade',
                        type: 'varchar',
                        isNullable:false
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
                    },

                    {
                        name: 'telefone',
                        type: 'varchar',
                        isNullable:false
                    },
                     {
                        name: 'genero',
                        type: 'varchar',
                        isNullable:true
                    },

                     {
                        name: 'tiposanguineo',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'nis',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'ctps',
                        type: 'varchar',
                        isNullable:false
                    },

                    {
                        name: 'datanascimento',
                        type: 'date',
                        isNullable:false
                    },
                    {
                        name: 'endereco',
                        type: 'varchar',
                        isNullable:true
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable:false
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
         await queryRunner.dropTable('pacientes');
    }

}
