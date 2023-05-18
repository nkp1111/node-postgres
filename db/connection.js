const { Client } = require("pg")
require("dotenv").config()

const databaseConnection = () => {
  const client = new Client(
    {
      server: process.env.DATABASE_SERVER,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    }
  )

  client.connect(async (err) => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })

  return client
}

module.exports = databaseConnection