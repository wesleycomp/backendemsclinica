"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateNacionalidade1654882090510 = void 0;
var _typeorm = require("typeorm");
class CreateNacionalidade1654882090510 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'nacionalidade',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'nomepais',
        type: 'varchar'
      }, {
        name: 'codigo',
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
    await queryRunner.dropTable('nacionalidade');
  }
}
exports.CreateNacionalidade1654882090510 = CreateNacionalidade1654882090510;