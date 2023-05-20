const { databaseConnection, sq } = require("./db/connection")
const express = require("express")
const app = express()

const taskRoutes = require("./routes/TaskRouter")

const port = 3000

databaseConnection().then(async () => {
  await sq.sync()

  app.use("/task", taskRoutes)

  app.listen(port, (e) => {
    console.log("App listening on port " + port)
  })
})
