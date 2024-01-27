const { DataTypes } = require("sequelize");
const sequelize = require("../config");
const Ticket = require("./Ticket");

const TicketUpdate = sequelize.define('TicketUpdate', {
    UpdateID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    TicketID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    UpdateDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    UpdatedAttachmentUrl: {
        type: DataTypes.STRING, // Store the URL or path to the uploaded file
        allowNull: true,
    },

});

TicketUpdate.belongsTo(Ticket, { foreignKey: 'TicketID' });

module.exports = TicketUpdate;
