const { Task } = require("../db/taskSchema")
const { User } = require("../db/UserSchema")
const { sq } = require("../db/connection")

module.exports.getAllTasks = async (args) => {
  // get all tasks from database
  const { userId } = args
  try {
    await sq.sync()
    const user = await User.findByPk(+userId, { include: 'tasks' });
    return user
  } catch (error) {
    console.log(error)
    return
  }
}

module.exports.createNewTask = async (args) => {
  // create new task 
  // params task_name : name of the task user wants to add
  const { task_name, userId } = args
  if (!task_name) {
    return { error: "Please send a task name along e.g. /:userId/task/new/:task_name" }
  }
  try {
    const task = await Task.create({ task_name, completed: false, userId: +userId });
    const user = await User.findByPk(+userId, { include: 'tasks' })
    user.tasks.push(task)
    const userUpdated = await user.save()
    return { success: "New task created", task }
  } catch (error) {
    console.log("add error\n", error)
  }
}

module.exports.deleteSingleTask = async (args) => {
  // delete a task with given id
  // params: id - id of task
  const { id, userId } = args
  if (!id) {
    return { error: "Please send id along with query e.g. /delete/1" }
  }
  if (isNaN(id) && isNaN(parseFloat(id))) {
    return { error: "Please provide a proper value for id e.g. 1" }
  }
  try {
    const user = await User.findByPk(+userId, { include: "tasks" });
    const newTasks = user.tasks.filter(task => task.id !== +id)

    if (newTasks.length + 1 === user.tasks.length) {
      const task = await Task.findByPk(+id);
      await task.destroy();
      user.tasks = newTasks
      await user.save()
      return { success: "Task deleted", id }
    } else {
      return { error: "Task not found", id }
    }
  } catch (error) {
    console.log("delete error\n", error)
  }
}

module.exports.editSingleTask = async (args) => {
  // edit a task complete status from true to false and vice versa
  // params: id - id of task
  const { id, userId } = args
  if (!id) {
    return { error: "Please send id along with query e.g. /edit/1" }
  }
  if (isNaN(id) && isNaN(parseFloat(id))) {
    return { error: "Please provide a proper value for id e.g. 1" }
  }
  try {
    const task = await Task.findByPk(id)
    if (!task || task.userId !== +userId) {
      return { error: "Wrong id provided please check your task id." }
    }
    const result = await Task.update({ completed: !task.completed },
      {
        where: { id }
      });

    if (result[0] === 1) {
      return { success: "Task Updated", id }
    }
    else {
      return { error: "Task Not Updated", id }
    }

  } catch (error) {
    console.log("delete error\n", error)
  }
}

module.exports.showDetailTask = async (args) => {
  // show detail of single task
  // params: id - id of task
  const { id, userId } = args
  if (isNaN(id) && isNaN(parseFloat(id))) {
    return { error: "Please provide a proper value for id e.g. 1" }
  }
  try {
    const task = await Task.findByPk(id)
    if (!task || task.userId !== +userId) {
      return { error: "Wrong id provided please check your task id." }
    }
    else {
      return { task }
    }
  } catch (error) {
    console.log("detail error\n", error)
  }
}

module.exports.deleteAllTasks = async (args) => {
  // delete all tasks
  const isAdmin = false
  if (isAdmin) {
    try {
      await Task.drop()
      return { success: "ALL TASK DELETED" }
    } catch (error) {
      console.log(error)
    }
  } else {
    return { error: "Permission denied" }
  }
}