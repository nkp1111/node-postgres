# Todo list with express and Postgres

- Simple todo list.
- Built with node and postgres.
- Show all tasks, "[/](https://node-postgres-rho.vercel.app/)".
- Create new task, "[/new/:task_name](https://node-postgres-rho.vercel.app/new/this_is_new_task)"
- Show detail of a single task, "[/detail/:id](https://node-postgres-rho.vercel.app/detail/1)"
- Update task status(completed or not), "[/edit/:id](https://node-postgres-rho.vercel.app/edit/1)"
- Delete task, "[/delete/:id](https://node-postgres-rho.vercel.app/delete/1)"

*Note:* The routes with id params uses task id which may lead to blank page if deleted.

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
