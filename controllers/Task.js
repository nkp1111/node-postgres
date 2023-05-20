const { Task } = require("../db/taskSchema")
const { sq } = require("../db/connection")

module.exports.getAllTasks = async (req, res) => {
  // get all tasks from database
  try {
    await sq.sync()
    const tasks = await Task.findAll();
    res.send({ status: "ALL TASKS", ...tasks })
  } catch (error) {
    console.log("all", error)
  }
}

module.exports.createNewTask = async (req, res) => {
  // create new task 
  // params task_name : name of the task user wants to add
  const { task_name } = req.params
  if (!task_name) {
    res.send({ error: "Please send a task name along e.g. /new/<task_name>" })
  }
  try {
    const task = await Task.create({ task_name, completed: false });
    res.send({ status: "NEW TASK CREATED", task })
  } catch (error) {
    console.log("add error\n", error)
  }
}

module.exports.deleteSingleTask = async (req, res) => {
  // delete a task with given id
  // params: id - id of task
  const { id } = req.params
  if (!id) {
    res.send({ error: "Please send id along with query e.g. /delete/1" })
    return
  }
  if (isNaN(id) && isNaN(parseFloat(id))) {
    res.send({ error: "Please provide a proper value for id e.g. 1" })
    return
  }
  try {
    const result = await Task.destroy({ where: { id } });
    if (result === 1) {
      res.send({ status: "TASK DELETED", id })
    }
    else {
      res.send({ status: "TASK NOT FOUND", id })
    }
  } catch (error) {
    console.log("delete error\n", error)
  }
}

module.exports.editSingleTask = async (req, res) => {
  // edit a task complete status from true to false and vice versa
  // params: id - id of task
  const { id } = req.params
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
    if (!task) {
      res.send({ error: "Wrong id provided please check your task id." })
      return
    }
    const result = await Task.update({ completed: !task.completed },
      {
        where: { id }
      });

    if (result[0] === 1) {
      res.send({ status: "UPDATED", id })
    }
    else {
      res.send({ status: "NOT UPDATED", id })
    }

  } catch (error) {
    console.log("delete error\n", error)
  }
}

module.exports.showDetailTask = async (req, res) => {
  // show detail of single task
  // params: id - id of task
  const { id } = req.params
  if (isNaN(id) && isNaN(parseFloat(id))) {
    res.send({ error: "Please provide a proper value for id e.g. 1" })
    return
  }
  try {
    const task = await Task.findByPk(id)
    if (!task) {
      res.send({ error: "Wrong id provided please check your task id." })
      return
    }
    else {
      res.send({ status: "DETAIL TASK", task })
      return
    }
  } catch (error) {
    console.log("detail error\n", error)
  }
}

module.exports.deleteAllTasks = async (req, res) => {
  // delete all tasks
  try {
    await Task.drop()
    res.send({ status: "ALL TASK DELETED" })
  } catch (error) {
    console.log(error)
  }
}