"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateClinica1667402224906 = void 0;
var _typeorm = require("typeorm");
class CreateClinica1667402224906 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'clinica',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'descricao',
        type: 'varchar'
      }, {
        name: 'ativo',
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
    await queryRunner.dropTable('clinicas');
  }
}
exports.CreateClinica1667402224906 = CreateClinica1667402224906;