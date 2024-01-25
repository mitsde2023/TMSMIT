const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Department = require('./Department');

const SubDepartment = sequelize.define('SubDepartment', {
  SubDepartmentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  SubDepartmentName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

SubDepartment.belongsTo(Department, { foreignKey: 'DepartmentID' });

module.exports = SubDepartment;
