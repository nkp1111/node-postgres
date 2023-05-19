const { databaseConnection, sq } = require("./db/connection")
const express = require("express")
const app = express()

const tasks = require("./controllers")

const port = 3000

databaseConnection().then(async () => {
  await sq.sync()

  app.get("/", tasks.getAllTasks)

  app.get("/new/:task_name", tasks.createNewTask)

  app.get("/delete/:id", tasks.deleteSingleTask)

  app.get("/edit/:id", tasks.editSingleTask)

  app.get("/detail/:id", tasks.showDetailTask)

  app.listen(port, (e) => {
    console.log("App listening on port " + port)
  })
})
