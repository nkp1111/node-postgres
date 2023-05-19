const { Sequelize } = require('sequelize');
require("dotenv").config()

const user = process.env.DATABASE_USER
const password = process.env.DATABASE_PASSWORD
const port = process.env.DATABASE_PORT
const dbName = process.env.DATABASE_NAME
const sequelize = new Sequelize(dbName, user, password, {
  host: 'localhost',
  port: port,
  dialect: 'postgres',
});

const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    return sequelize
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = databaseConnection