const { DataTypes } = require("sequelize")
const dbConnection = require("./db/connection")
const express = require("express")
const app = express()

const port = 3000

dbConnection().then(async data => {
  const sequelize = data

  const dropTable = async () => {
    try {
      await Task.drop();
    } catch (error) {
      console.log(error)
    }
  }

  const Task = sequelize.define('Task', {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    // Other model options go here
    freezeTableName: true,
  });

  app.get("/", async (req, res) => {
    // get all tasks from database
    try {
      await sequelize.sync()
      const tasks = await Task.findAll();
      res.send({ status: "ALL", ...tasks })
    } catch (error) {
      console.log("all", error)
    }
  })

  app.get("/new/:task_name", async (req, res) => {
    // create new task 
    // params task_name : name of the task user wants to add
    const { task_name } = req.params
    try {
      await sequelize.sync()
      const task = await Task.create({ task_name, completed: false });
      res.send({ status: "NEW ADDED", ...task.dataValues })
    } catch (error) {
      console.log("add error\n", error)
    }
  })

  app.get("/delete/:id", async (req, res) => {
    // delete a task with given id
    // params: id - id of task
    const { id } = req.params
    try {
      await sequelize.sync()
      const task = await Task.destroy({ where: { id } });
      res.send({ status: "DELETED", id })
    } catch (error) {
      console.log("delete error\n", error)
    }
  })

  app.get("/edit", async (req, res) => {
    // edit a task complete status from true to false and vice versa
    const { id } = req.query
    try {
      await sequelize.sync()
      const task = await Task.findByPk(id)
      const result = await Task.update({ completed: !task.completed },
        {
          where: { id }
        });
      if (result[0] === 1) res.send({ status: "UPDATED", id })
      else res.send({ status: "NOT UPDATED", id })

    } catch (error) {
      console.log("delete error\n", error)
    }
  })

  app.listen(port, (e) => {
    console.log("App listening on port " + port)
  })
})





