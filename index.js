const dbConnection = require("./db/connection")

const client = dbConnection()

const dropTable = async (table) => {
  // drop table with given name 
  // params: table(array) - ["table_name"]
  const dropQuery = "DROP TABLE $1::text;"
  const res = await client.query(dropQuery, table)
  return res
}

const createTable = async () => {
  // create table of name 'task' 
  // with id,task_name,completed,time as columns
  const createQuery = `CREATE TABLE task(
    id SERIAL PRIMARY KEY, 
    task_name VARCHAR(200) NOT NULL, 
    completed BOOL NOT NULL DEFAULT false, 
    time TIMESTAMP);`
  const res = await client.query(createQuery)
  return res
}

const readTable = async () => {
  // read task table and returns all the rows value
  const selectQuery = "SELECT * FROM task;"
  const res = await client.query(selectQuery)
  return res
}

const insertIntoTable = async (task_name, time, status) => {
  // insert new task into table
  // params: task_name (string) - name of the task
  //         time (timestamp) - task starting time
  //         status (boolean) - task status whether completed or not
  const taskItem = [task_name, time, status]
  const insertQuery = "INSERT INTO task (task_name, time, completed) VALUES ($1::text, $2::timestamp, $3::bool);"
  const res = await client.query(insertQuery, taskItem)
  return res
}

const updateTable = async (id, status) => {
  // update task of given id into new status
  // params: id(int) - id of the task
  //         status (bool) - either true or false
  const updateItem = [id, status]
  const updateQuery = "UPDATE task set completed=$2::bool where id=$1::int"
  const res = await client.query(updateQuery, updateItem)
  return res
}

const deleteFromTable = async (id) => {
  // delete task from table of given id
  // params: id (int) - id of task
  const deleteItem = [id]
  const deleteQuery = "DELETE FROM task where id = $1::int"
  const res = await client.query(deleteQuery, deleteItem)
  return res
}
