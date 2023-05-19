const { DataTypes } = require("sequelize");
const dbConnection = require("./db/connection")

dbConnection().then(async data => {
  const sequelize = data

  const dropTable = async () => {
    try {
      await Task.drop();
    } catch (error) {
      console.log(error)
    }
  }
  // dropTable()

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


  const createTask = async () => {
    await sequelize.sync()
    const task = await Task.create({ task_name: "modifying code", completed: false });
    console.log(task.id);
  }

  const findAllTask = async () => {
    try {
      await sequelize.sync()
      const tasks = await Task.findAll();
      console.log(tasks)
    } catch (error) {
      console.log(error)
    }
  }

  createTask()
  findAllTask()
})
