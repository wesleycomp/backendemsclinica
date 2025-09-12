"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1655230153765 = void 0;
var _typeorm = require("typeorm");
class CreateUsers1655230153765 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'user',
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
        name: 'email',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'perfil',
        type: 'varchar'
      }, {
        name: 'master',
        type: 'varchar',
        default: 'false'
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
    await queryRunner.dropTable('user');
  }
}
exports.CreateUsers1655230153765 = CreateUsers1655230153765;