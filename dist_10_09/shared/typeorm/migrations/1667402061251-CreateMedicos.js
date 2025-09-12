"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateMedicos1667402061251 = void 0;
var _typeorm = require("typeorm");
class CreateMedicos1667402061251 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'medico',
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
        name: 'cpf',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'rg',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'crm',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'ufcrm',
        type: 'varchar',
        isNullable: false
      }, {
        name: 'telefone',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'datanascimento',
        type: 'timestamp'
      }, {
        name: 'endereco',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'email',
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
    await queryRunner.dropTable('medico');
  }
}
exports.CreateMedicos1667402061251 = CreateMedicos1667402061251;