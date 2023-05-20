const { User } = require("../db/UserSchema")

/**
 * @desc Creates a user if not already present in database.
 * @returns {object} - User info.
 */
module.exports.createUser = async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.send({ error: "Please provide a username and password" })
    return
  }
  try {
    const isUser = await User.findOne({ username })
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
