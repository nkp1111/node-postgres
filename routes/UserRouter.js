const express = require("express")
const router = express.Router()

const {
  userController: {
    createUser
  }
} = require("../controllers")

router.put("/new", createUser)

module.exports = router