"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateEmpresas1660063950987 = void 0;
var _typeorm = require("typeorm");
class CreateEmpresas1660063950987 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'empresa',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'nome',
        type: 'varchar'
      }, {
        name: 'cnpj',
        type: 'varchar'
      }, {
        name: 'cpf',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'ideEmpregador',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'inscricaoestadual',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'inscricaomunicipal',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'endereco',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'telefone',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'email',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'empresafora',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'responsavel',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'observacao',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'esocial',
        type: 'boolean'
      }, {
        name: 'convenio',
        type: 'boolean'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropTable('empresas');
  }
}
exports.CreateEmpresas1660063950987 = CreateEmpresas1660063950987;