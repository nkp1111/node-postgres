const { User } = require("../db/UserSchema")
const { sq } = require("../db/connection")

/**
 * @desc Creates a user if not already present in database.
 * @returns {object} - User info.
 */
module.exports.createUser = async (req, res) => {
  await sq.sync()
  const { username, password } = req.body
  if (!username || !password) {
    res.send({ error: "Please provide a username and password" })
    return
  }
  try {
    const isUser = await User.findOne({ where: { username } })
    if (isUser) {
      res.send({ error: "User is already present." })
      return
    }
    const user = await User.create({
      username,
      password
    })

    res.send({ status: "NEW USER CREATED", user })
  } catch (error) {
    console.log(error)
  }
}

module.exports.deleteAllUsers = async (req, res) => {
  // delete all tasks
  try {
    await sq.query('DROP TABLE IF EXISTS "User" CASCADE')
    res.send({ status: "ALL USER DELETED" })
  } catch (error) {
    console.log(error)
  }
}