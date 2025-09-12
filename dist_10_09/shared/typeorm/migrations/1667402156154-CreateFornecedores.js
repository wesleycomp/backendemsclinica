"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFornecedores1667402156154 = void 0;
var _typeorm = require("typeorm");
class CreateFornecedores1667402156154 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'fornecedor',
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
        isNullable: false
      }, {
        name: 'email',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'responsavel',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'ehlaboratorio',
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
    await queryRunner.dropTable('fornecedor');
  }
}
exports.CreateFornecedores1667402156154 = CreateFornecedores1667402156154;