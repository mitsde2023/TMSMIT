const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Student = require('./Student');
const Department = require('./Department');
const SubDepartment = require('./SubDepartment');
const Employee = require('./Employee');

const Ticket = sequelize.define('Ticket', {
  TicketID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Status: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  Description: {
    type: DataTypes.TEXT,
  },
  Feedback: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },

  StudentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  EmployeeID: { // Include EmployeeID field
    type: DataTypes.INTEGER,
    allowNull: true, // Make it nullable if you want to allow tickets without a specific employee
  },
  AttachmentUrl: {
    type: DataTypes.STRING, // Store the URL or path to the uploaded file
    allowNull: true,
  },
});

Ticket.belongsTo(Student, { foreignKey: 'StudentId' });
Ticket.belongsTo(Department, { foreignKey: 'AssignedToDepartmentID' });
Ticket.belongsTo(SubDepartment, { foreignKey: 'AssignedToSubDepartmentID' });
Ticket.belongsTo(Department, { foreignKey: 'TransferredToDepartmentID', as: 'TransferredToDepartment' });
Ticket.belongsTo(SubDepartment, { foreignKey: 'TransferredToSubDepartmentID', as: 'TransferredToSubDepartment' });
Ticket.belongsTo(Employee, { foreignKey: 'EmployeeID' });

module.exports = Ticket;
