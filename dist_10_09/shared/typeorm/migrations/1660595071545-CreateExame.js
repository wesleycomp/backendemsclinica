"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateExame1660595071545 = void 0;
var _typeorm = require("typeorm");
class CreateExame1660595071545 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'exame',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'valoravista',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0
      }, {
        name: 'valormedico',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0
      }, {
        name: 'valorems',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0
      }, {
        name: 'ativo',
        type: 'boolean'
      }, {
        name: 'usuariocadastro',
        type: 'varchar'
      }, {
        name: 'usuarioedicao',
        type: 'varchar'
      }, {
        name: 'localrealizacaoexame',
        type: 'varchar',
        isNullable: true
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
    await queryRunner.dropTable('exame');
  }
}
exports.CreateExame1660595071545 = CreateExame1660595071545;