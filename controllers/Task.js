const { Task } = require("../db/taskSchema")
const { User } = require("../db/UserSchema")
const { sq } = require("../db/connection")

module.exports.getAllTasks = async (req, res) => {
  // get all tasks from database
  const { userId } = req.params
  try {
    await sq.sync()
    const user = await User.findByPk(+userId, { include: 'tasks' });
    res.send({ user })
  } catch (error) {
    console.log("all", error)
  }
}

module.exports.createNewTask = async (req, res) => {
  // create new task 
  // params task_name : name of the task user wants to add
  const { task_name, userId } = req.params
  if (!task_name) {
    res.send({ error: "Please send a task name along e.g. /:userId/task/new/:task_name" })
  }
  try {
    const task = await Task.create({ task_name, completed: false, userId: +userId });
    const user = await User.findByPk(+userId, { include: 'tasks' })
    user.tasks.push(task)
    const userUpdated = await user.save()
    res.send({ success: "New task created", task })
  } catch (error) {
    console.log("add error\n", error)
  }
}

module.exports.deleteSingleTask = async (req, res) => {
  // delete a task with given id
  // params: id - id of task
  const { id, userId } = req.params
  if (!id) {
    res.send({ error: "Please send id along with query e.g. /delete/1" })
    return
  }
  if (isNaN(id) && isNaN(parseFloat(id))) {
    res.send({ error: "Please provide a proper value for id e.g. 1" })
    return
  }
  try {
    const user = await User.findByPk(userId, { include: "tasks" });
    const newTasks = user.tasks.filter(task => task.id !== +id)

    if (newTasks.length + 1 === user.tasks.length) {
      const task = await Task.findByPk(+id);
      await task.destroy();
      user.tasks = newTasks
      await user.save()
      res.send({ success: "Task deleted", id })
      return
    }
    res.send({ error: "Task not found", id })
    return
  } catch (error) {
    console.log("delete error\n", error)
  }
}

module.exports.editSingleTask = async (req, res) => {
  // edit a task complete status from true to false and vice versa
  // params: id - id of task
  const { id, userId } = req.params
  if (!id) {
    res.send({ error: "Please send id along with query e.g. /edit/1" })
    return
  }
  if (isNaN(id) && isNaN(parseFloat(id))) {
    res.send({ error: "Please provide a proper value for id e.g. 1" })
    return
  }
  try {
    const task = await Task.findByPk(id)
    if (!task || task.userId !== +userId) {
      res.send({ error: "Wrong id provided please check your task id." })
      return
    }
    const result = await Task.update({ completed: !task.completed },
      {
        where: { id }
      });

    if (result[0] === 1) {
      res.send({ success: "Task Updated", id })
    }
    else {
      res.send({ error: "Task Not Updated", id })
    }

  } catch (error) {
    console.log("delete error\n", error)
  }
}

module.exports.showDetailTask = async (req, res) => {
  // show detail of single task
  // params: id - id of task
  const { id, userId } = req.params
  if (isNaN(id) && isNaN(parseFloat(id))) {
    res.send({ error: "Please provide a proper value for id e.g. 1" })
    return
  }
  try {
    const task = await Task.findByPk(id)
    if (!task || task.userId !== +userId) {
      res.send({ error: "Wrong id provided please check your task id." })
      return
    }
    else {
      res.send({ task })
      return
    }
  } catch (error) {
    console.log("detail error\n", error)
  }
}

module.exports.deleteAllTasks = async (req, res) => {
  // delete all tasks
  const isAdmin = false
  if (isAdmin) {
    try {
      await Task.drop()
      res.send({ success: "ALL TASK DELETED" })
    } catch (error) {
      console.log(error)
    }
  } else {
    res.send({ error: "Permission denied" })
  }
}