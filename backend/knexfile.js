// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER,
      host:process.env.DBHOST,
      database:process.env.POSTGRES_DB,
      password:process.env.POSTGRES_PASSWORD,
      port:process.env.DBPORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    }
  },

  // development: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './src/database/db.sqlite'
  //   },
  //   migrations: {
  //     directory: './src/database/migrations'
  //   },
  //   useNullAsDefault: true
  // },

  test: {
    client: 'sqlite3',
    connection: {
      filename: ':memory:' //'./src/database/test.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      user: process.env.POSTGRES_USER,
      host:process.env.DBHOST,
      database:process.env.POSTGRES_DB,
      password:process.env.POSTGRES_PASSWORD,
      port:process.env.DBPORT,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './src/database/migrations',
      tableName: 'knex_migrations'
    }
  }

};
