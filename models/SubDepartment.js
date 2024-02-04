const { DataTypes } = require('sequelize');
const sequelize = require('../config');
// const Department = require('./Department');
// const Employee = require('./Employee');

const SubDepartment = sequelize.define('SubDepartment', {
  // SubDepartmentID: {
  //   type: DataTypes.INTEGER,
  //   primaryKey: true,
  //   autoIncrement: true,
  // },
  SubDepartmentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

// SubDepartment.belongsTo(Department, { foreignKey: 'DepartmentID' });
// SubDepartment.hasMany(Employee, { foreignKey: 'SubDepartmentId' });

module.exports = SubDepartment;
