const express = require("express")
const router = express.Router()

const {
  taskController: {
    getAllTasks, createNewTask, deleteSingleTask, editSingleTask, showDetailTask
  }
} = require("../controllers")


router.get("/", getAllTasks)

router.put("/new/:task_name", createNewTask)

router.delete("/delete/:id", deleteSingleTask)

router.patch("/edit/:id", editSingleTask)

router.get("/detail/:id", showDetailTask)

module.exports = router