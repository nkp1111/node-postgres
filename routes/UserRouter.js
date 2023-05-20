const express = require("express")
const router = express.Router()

const {
  userController: {
    createUser, deleteAllUsers
  }
} = require("../controllers")

router.put("/new", createUser)
router.delete("/delete/all", deleteAllUsers)

module.exports = router