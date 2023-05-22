const { gql } = require("apollo-server")

const typeDefs = gql`
  type Task {
    id: ID!
    task_name: String!
    completed: Boolean!
    userId: ID!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    tasks: [Task]
  }

  type Query {
    "Show all tasks"
    getAllTasks(userId: Int!): User

    "Show one task detail"
    showDetailTask(userId:Int!, id:Int!): CreateNewOrShowTask
  }

  type Mutation {

    "Create new user with given username and password"
    createUser(username: String!, password: String!): CreateUserReturn

    "Delete all users in database, admin only route"
    deleteAllUsers: StatusMessage

    "Create new task for a given user using userId and task name"
    createNewTask(userId: Int!,task_name: String!): CreateNewOrShowTask

    "Delete Single task for a user with task id"
    deleteSingleTask(userId: Int!, id: Int!): EditOrDeleteSingleTask

    "Edit Single task of a user with task id"
    editSingleTask(userId: Int!, id: Int!): EditOrDeleteSingleTask

    "Delete all tasks"
    deleteAllTasks: StatusMessage
  }

  type StatusMessage {
    error: String 
    success: String
  }

  type CreateUserReturn {
    error: String 
    success: String
    user: User
  }

  type CreateNewOrShowTask {
    error: String 
    success: String
    task: Task
  }

  type EditOrDeleteSingleTask {
    error: String 
    success: String
    id: Int
  }
`

module.exports = typeDefs