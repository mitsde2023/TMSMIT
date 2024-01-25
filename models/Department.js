const { DataTypes } = require('sequelize');
const sequelize = require('../config');

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

module.exports = Department;
