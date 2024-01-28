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
  StudentEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Registration_No : {
    type: DataTypes.STRING,
    allowNull: false,
  },
  StudentPassword: {
    type: DataTypes.STRING, // Change the data type based on your security requirements
    allowNull: false,
  },

});

module.exports = Student;
