const { Sequelize } = require("sequelize");


const sequelize = new Sequelize('sys', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});


module.exports = sequelize;