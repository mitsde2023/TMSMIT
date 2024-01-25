const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Student = sequelize.define('Student', {
  StudentID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StudentName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Registration_No : {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

module.exports = Student;
