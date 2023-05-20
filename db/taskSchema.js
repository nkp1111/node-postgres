const { DataTypes } = require("sequelize")

const { sq } = require("./connection")

const Task = sq.define('Task', {
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
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  // Other model options go here
  freezeTableName: true,
})

module.exports = { Task }