const express = require("express")
const router = express.Router({ mergeParams: true })

const { User } = require("../db/UserSchema")

const {
  taskController: {
    getAllTasks, createNewTask, deleteSingleTask, editSingleTask, showDetailTask, deleteAllTasks,
  }
} = require("../controllers")

router.use(async (req, res, next) => {
  const { userId } = req.params

  if (!userId) {
    res.send({ error: "Only a User can access a task" })
    return
  }
  if (isNaN(userId) && isNaN(parseFloat(userId))) {
    res.send({ error: "Incorrect User id, user id must be number" })
    return
  }

  try {
    const isUser = await User.findOne({ where: { id: +userId } })
    if (!isUser) {
      res.send({ error: "Not a valid user id" })
      return
    }

    next()
  } catch (error) {
    console.log(error)
  }
})

router.get("/", getAllTasks)

router.put("/new/:task_name", createNewTask)

router.delete("/delete/all", deleteAllTasks)

router.delete("/delete/:id", deleteSingleTask)

router.patch("/edit/:id", editSingleTask)

router.get("/detail/:id", showDetailTask)


module.exports = router