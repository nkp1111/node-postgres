const { User } = require("../db/UserSchema")
const { sq } = require("../db/connection")

/**
 * @desc Creates a user if not already present in database.
 * @returns {object} - User info.
 */
module.exports.createUser = async (args) => {
  await sq.sync()
  const { username, password } = args
  if (!username || !password) {
    return { error: "Please provide a username and password" }
  }
  try {
    const isUser = await User.findOne({ where: { username } })
    if (isUser) {
      return { error: "User is already present." }
    }
    const user = await User.create({
      username,
      password
    })

    return { success: "Successfully created User", user }
  } catch (error) {
    console.log(error)
  }
}

module.exports.deleteAllUsers = async (args) => {
  // delete all tasks
  const isAdmin = false
  if (isAdmin) {
    try {
      await sq.query('DROP TABLE IF EXISTS "User" CASCADE')
      return { success: "ALL USER DELETED" }
    } catch (error) {
      console.log(error)
    }
  } else {
    return { error: "Permission denied" }
  }

}