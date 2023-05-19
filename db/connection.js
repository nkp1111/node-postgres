const { Sequelize } = require('sequelize');
require("dotenv").config()

// // in production 
// const user = process.env.DATABASE_USER
// const password = process.env.DATABASE_PASSWORD
// const port = process.env.DATABASE_PORT
// const dbName = process.env.DATABASE_NAME

// const sequelize = new Sequelize(dbName, user, password, {
//   host: 'localhost',
//   port: port,
//   dialect: 'postgres',
//   dialectModule: require('pg'),
// });

// in development
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialectModule: require('pg'),
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  }
})

const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sq: sequelize, databaseConnection }