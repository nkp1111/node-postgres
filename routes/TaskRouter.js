const express = require("express")

const tasks = require("../controllers")

const router = express.Router()

router.get("/", tasks.getAllTasks)

router.get("/new/:task_name", tasks.createNewTask)

router.get("/delete/:id", tasks.deleteSingleTask)

router.get("/edit/:id", tasks.editSingleTask)

router.get("/detail/:id", tasks.showDetailTask)

module.exports = router