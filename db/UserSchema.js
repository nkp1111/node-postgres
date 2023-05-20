const { DataTypes } = require("sequelize")

const { sq } = require("./connection")

module.exports.User = sq.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  // Other model options go here
  timestamps: false,
  freezeTableName: true,
});