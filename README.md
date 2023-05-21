# Todo list with express and Postgres

- Simple todo list.
- Built with node and postgres using sequelize.
- Allow user creation, "PUT /user/new", {username, password} on request body.
- Allow user to create a todo list.
- Show all tasks, "GET /:id/task".
- Create new task, "PUT /:id/task/new/:task_name"
- Show detail of a single task, "GET /:id/task/detail/:taskId"
- Update task status(completed or not), "PATCH /:id/task/edit/:taskId"
- Delete task, "DELETE /:id/task/delete/:taskId"

*Note:* id is user id and taskId is id for different tasks created by user.

## Links

- [GitHub](https://github.com/nkp1111/node-postgres)
- [Live Server](https://node-postgres-rho.vercel.app/)

## Built with

- express
- pg
- sequelize
- dotenv

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Postgres](https://www.postgresql.org/), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/nkp1111/node-postgres.git

# Install dependencies
$ npm install

# provide proper values for environment variables in .env file

# Run the app
$ npm start
```

## Contact

- Website [Neeraj Parmar](https://portfolio-teal-six-33.vercel.app/)
- GitHub [nkp1111](https://github.com/nkp1111)
- Twitter - [@nkp11111507](https://twitter.com/@nkp11111507)
