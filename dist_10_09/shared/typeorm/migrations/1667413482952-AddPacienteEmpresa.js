"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddPacienteEmpresa1667413482952 = void 0;
var _typeorm = require("typeorm");
class AddPacienteEmpresa1667413482952 {
  async up(queryRunner) {
    await queryRunner.addColumn('paciente', new _typeorm.TableColumn({
      name: 'empresa_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('paciente', new _typeorm.TableForeignKey({
      name: 'EmpresaPaciente',
      columnNames: ['empresa_id'],
      referencedTableName: 'empresa',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('paciente', new _typeorm.TableColumn({
      name: 'funcao_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('paciente', new _typeorm.TableForeignKey({
      name: 'FuncaoPaciente',
      columnNames: ['funcao_id'],
      referencedTableName: 'funcao',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('paciente', new _typeorm.TableColumn({
      name: 'categoriatrabalhador_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('paciente', new _typeorm.TableForeignKey({
      name: 'CategoriaTrabalhadorPaciente',
      columnNames: ['categoriatrabalhador_id'],
      referencedTableName: 'categoriatrabalhador',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
    await queryRunner.addColumn('paciente', new _typeorm.TableColumn({
      name: 'nacionalidade_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('paciente', new _typeorm.TableForeignKey({
      name: 'NacionalidadePaciente',
      columnNames: ['nacionalidade_id'],
      referencedTableName: 'nacionalidade',
      referencedColumnNames: ['id'],
      onDelete: 'SET NULL'
    }));
  }
  async down(queryRunner) {
    await queryRunner.dropForeignKey('paciente', 'EmpresaPaciente');
    await queryRunner.dropForeignKey('paciente', 'FuncaoPaciente');
    await queryRunner.dropForeignKey('paciente', 'CategoriaTrabalhadorPaciente');
    await queryRunner.dropForeignKey('paciente', 'NacionalidadePaciente');
    await queryRunner.dropColumn('paciente', 'empresa_id');
    await queryRunner.dropColumn('paciente', 'funcao_id');
    await queryRunner.dropColumn('paciente', 'categoriatrabalhador_id');
    await queryRunner.dropColumn('paciente', 'nacionalidade_id');
  }
}
exports.AddPacienteEmpresa1667413482952 = AddPacienteEmpresa1667413482952;