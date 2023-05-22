const {
  userController: {
    createUser,
    deleteAllUsers
  },
  taskController: {
    getAllTasks,
    createNewTask,
    showDetailTask,
    editSingleTask,
    deleteSingleTask,
    deleteAllTasks,
  }
} = require("../controllers")

const wrapperFunc = (func, args) => {
  return func(args).then(data => data)
}

const resolvers = {
  Mutation: {
    // users
    createUser: (parent, args, context, info) => {
      return wrapperFunc(createUser, args)
    },
    deleteAllUsers: (parent, args, context, info) => {
      return wrapperFunc(deleteAllUsers, args)
    },

    //tasks 
    createNewTask: (parent, args, context, info) => {
      return wrapperFunc(createNewTask, args)
    },
    editSingleTask: (parent, args, context, info) => {
      return wrapperFunc(editSingleTask, args)
    },
    deleteSingleTask: (parent, args, context, info) => {
      return wrapperFunc(deleteSingleTask, args)
    },
    deleteAllTasks: (parent, args, context, info) => {
      return wrapperFunc(deleteAllTasks, args)
    }
  },

  Query: {
    //tasks
    getAllTasks: (parent, args, context, info) => {
      return wrapperFunc(getAllTasks, args)
    },
    showDetailTask: (parent, args, context, info) => {
      return wrapperFunc(showDetailTask, args)
    }
  }
}


module.exports = resolvers