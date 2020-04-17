
# Be the hero App - BackEnd
### Javascript version

This is the backend implementation of the Be the Hero App, from Rocketseat. using:

- Node.js (Express)
- Knex (database: ~~`Sqlite`~~ `Postgres`)
- Nodemon

### Getting Started

There are some simple stepes to get the backend project up and runing. But there two forms

### Without Docker
Make sure you are at the `<project root>/backend` folder
```shell
> npm install
```
Setting the environment variables:
```shell
> cp .env.example .env
```
The above code just renames the file .env.example to .env

Then edit the `.env` file
```shell
# this is the content of a .env file
# 
SECRET=<inform any phrase without spaces>
POSTGRES_USER=<database user>
DBHOST=<server name or ip>
POSTGRES_DB=<database name>
POSTGRES_PASSWORD=<user password>
DBPORT=<5432 is the default, but it needs to be informed>
# end of file: .env
```
#### Important:
> The database, user, password and host they all need to exist!

```shell
> npm start 
```


The backend will be listening at `http://localhost:3333/`


### With Docker

`docker-compose path/to/project/docker-compose.dev.yml up`
The frontend will be listening at `http://localhost:3000/`

## Beyond the Rockseat's project

These are some of customizations made in the original project.

1. Added validation to all routes
1. JWT Authorization, with hashed password
1. Postgres instead Sqlite
1. Docker
1. Deploy






