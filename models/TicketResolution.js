const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const Ticket = require('./Ticket');

const TicketResolution = sequelize.define('TicketResolution', {
  TicketResolutionID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ResolutionStatus: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  ResolutionDescription: {
    type: DataTypes.TEXT,
  },
  ResolutionFeedback: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
  ResolutionTimestamp: {
    type: DataTypes.DATE,
  },
});

TicketResolution.belongsTo(Ticket, { foreignKey: 'TicketID' });

module.exports = TicketResolution;
