const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Student = require('./Student');
const Department = require('./Department');
const SubDepartment = require('./SubDepartment');

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
});

Ticket.belongsTo(Student, { foreignKey: 'UserID' });
Ticket.belongsTo(Department, { foreignKey: 'AssignedToDepartmentID' });
Ticket.belongsTo(SubDepartment, { foreignKey: 'AssignedToSubDepartmentID' });
Ticket.belongsTo(Department, { foreignKey: 'TransferredToDepartmentID', as: 'TransferredToDepartment' });
Ticket.belongsTo(SubDepartment, { foreignKey: 'TransferredToSubDepartmentID', as: 'TransferredToSubDepartment' });

module.exports = Ticket;
