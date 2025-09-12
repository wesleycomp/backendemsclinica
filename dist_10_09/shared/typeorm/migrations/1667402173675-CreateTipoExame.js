"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTipoExame1667402173675 = void 0;
var _typeorm = require("typeorm");
class CreateTipoExame1667402173675 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'tipoexame',
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
    await queryRunner.dropTable('tipoexame');
  }
}
exports.CreateTipoExame1667402173675 = CreateTipoExame1667402173675;