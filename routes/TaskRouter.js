const express = require("express")
const router = express.Router()

const tasks = require("../controllers")


router.get("/", tasks.getAllTasks)

router.put("/new/:task_name", tasks.createNewTask)

router.delete("/delete/:id", tasks.deleteSingleTask)

router.patch("/edit/:id", tasks.editSingleTask)

router.get("/detail/:id", tasks.showDetailTask)

module.exports = router