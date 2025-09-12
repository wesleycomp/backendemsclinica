"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoriaTrabalhadores1667402101672 = void 0;
var _typeorm = require("typeorm");
class CreateCategoriaTrabalhadores1667402101672 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'categoriatrabalhador',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'grupo',
        type: 'varchar'
      }, {
        name: 'codigo',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'descricao',
        type: 'varchar'
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
    await queryRunner.dropTable('categoriatrabalhadores');
  }
}
exports.CreateCategoriaTrabalhadores1667402101672 = CreateCategoriaTrabalhadores1667402101672;