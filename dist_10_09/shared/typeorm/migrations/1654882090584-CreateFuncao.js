"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFuncao1654882090584 = void 0;
var _typeorm = require("typeorm");
class CreateFuncao1654882090584 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'funcao',
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
        name: 'cbo',
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
    await queryRunner.dropTable('funcao');
  }
}
exports.CreateFuncao1654882090584 = CreateFuncao1654882090584;