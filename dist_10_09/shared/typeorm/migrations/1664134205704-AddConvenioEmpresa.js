"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddConvenioEmpresa1664134205704 = void 0;
var _typeorm = require("typeorm");
class AddConvenioEmpresa1664134205704 {
  async up(queryRunner) {
    await queryRunner.addColumn('convenioempresa', new _typeorm.TableColumn({
      name: 'empresa_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.addColumn('convenioempresa', new _typeorm.TableColumn({
      name: 'exame_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.addColumn('convenioempresa', new _typeorm.TableColumn({
      name: 'user_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('convenioempresa', new _typeorm.TableForeignKey({
      name: 'EmpresaConvenioEmpresa',
      columnNames: ['empresa_id'],
      referencedTableName: 'empresa',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.createForeignKey('convenioempresa', new _typeorm.TableForeignKey({
      name: 'ExameConvenioEmpresa',
      columnNames: ['exame_id'],
      referencedTableName: 'exame',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.createForeignKey('convenioempresa', new _typeorm.TableForeignKey({
      name: 'UserConvenioEmpresa',
      columnNames: ['user_id'],
      referencedTableName: 'user',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('convenioempresa', 'EmpresaConvenioEmpresa');
    await queryRunner.dropForeignKey('convenioexame', 'ExameConvenioEmpresa');
    await queryRunner.dropForeignKey('conveniouser', 'UserConvenioEmpresa');
    await queryRunner.dropColumn('convenioempresa', 'empresa_id');
    await queryRunner.dropColumn('convenioexame', 'exame_id');
    await queryRunner.dropColumn('conveniouser', 'user_id');
  }
}
exports.AddConvenioEmpresa1664134205704 = AddConvenioEmpresa1664134205704;