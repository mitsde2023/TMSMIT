const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const SubDepartment = require('./SubDepartment');
// const Employee = require('./Employee');

const Department = sequelize.define('Department', {
  DepartmentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  DepartmentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});
Department.hasMany(SubDepartment, { foreignKey: 'DepartmentId' });
// Department.hasMany(Employee, { foreignKey: 'DepartmentId' });

module.exports = Department;
