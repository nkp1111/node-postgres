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
    res.send("Please create new user  <br> Instructions:  <br> -'POST' request on route '/user/new'  <br> -{username, password} on request body  <br> - Note your id  <hr> Instruction for task  <br>  1. View all: GET /:id/task/  <br> 2.Task detail: GET /:id/task/detail/:taskId <br>  3.Create new task: PUT /:id/task/new/:task_name <br> 4.Edit task status: PATCH /:id/task/edit/:taskId <br> 5.Delete task: DELETE /:id/task/delete/:taskId")
  })

  app.use("/:userId/task", taskRouter)

  app.use("/user", userRouter)

  app.listen(port, (e) => {
    console.log("App listening on port " + port)
  })
})
