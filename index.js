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

  const deleteTask = async (id) => {
    try {
      await Task.destroy({
        where: {
          id
        }
      });
    } catch (error) {
      console.log(error)
    }
  }

  app.get("/", async (req, res) => {
    // get all tasks from database
    try {
      await sequelize.sync()
      const tasks = await Task.findAll();
      console.log(tasks)
      res.send(tasks)
    } catch (error) {
      console.log(error)
    }
  })

  app.get("/new/:task_name", async (req, res) => {
    const { task_name } = req.params
    try {
      await sequelize.sync()
      const task = await Task.create({ task_name, completed: false });
      console.log(task.id);
      res.send(task)
    } catch (error) {
      console.log(error)
    }
  })

  app.listen(port, (e) => {
    console.log("App listening on port " + port)
  })
})





