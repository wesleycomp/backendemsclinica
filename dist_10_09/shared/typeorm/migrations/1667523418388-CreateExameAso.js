"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateExameAso1667523418388 = void 0;
var _typeorm = require("typeorm");
class CreateExameAso1667523418388 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'exameaso',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'dataexame',
        type: 'timestamp'
      }, {
        name: 'datavalidadeexame',
        type: 'timestamp'
      }, {
        name: 'valorexamesemdesconto',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: 0
      }, {
        name: 'valorexame',
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
        name: 'desconto',
        type: 'boolean',
        isNullable: true,
        default: true
      }, {
        name: 'user_desconto',
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
    await queryRunner.dropTable('exameaso');
  }
}
exports.CreateExameAso1667523418388 = CreateExameAso1667523418388;