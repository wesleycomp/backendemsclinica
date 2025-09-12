"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddNaturezaJuridicaEmpresa1670529982006 = void 0;
var _typeorm = require("typeorm");
class AddNaturezaJuridicaEmpresa1670529982006 {
  async up(queryRunner) {
    await queryRunner.addColumn('empresa', new _typeorm.TableColumn({
      name: 'naturezajuridica_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('empresa', new _typeorm.TableForeignKey({
      name: 'NaturezaJuridicaEmpresa',
      columnNames: ['naturezajuridica_id'],
      referencedTableName: 'naturezajuridica',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('empresa', 'NaturezaJuridicaEmpresa');
    await queryRunner.dropColumn('empresa', 'naturezajuridica_id');
  }
}
exports.AddNaturezaJuridicaEmpresa1670529982006 = AddNaturezaJuridicaEmpresa1670529982006;