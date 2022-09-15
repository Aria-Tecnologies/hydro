
require('dotenv').config();

const Sequelize = require("sequelize");

const sequelize = new Sequelize('hydro', 'admin', 'Pruebas123', {
  host: 'localhost',
  dialect: 'mariadb'
})

exports.test = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}