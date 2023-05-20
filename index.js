const { databaseConnection, sq } = require("./db/connection")
const express = require("express")
const app = express()

const { taskRouter, userRouter } = require("./routes")

const port = 3000

databaseConnection().then(async () => {
  await sq.sync()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.get("/", (req, res) => {
    res.send("Please create new user \n Instructions: \n -'POST' request on route '/user/new' \n -'{username, password}' on request body \n")
  })
  app.use("/task", taskRouter)
  app.use("/user", userRouter)

  app.listen(port, (e) => {
    console.log("App listening on port " + port)
  })
})
