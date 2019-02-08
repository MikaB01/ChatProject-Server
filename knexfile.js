module.exports = {

    development: {
      client: 'mysql',
      connection: {
          host : '127.0.0.1',
          user : 'chatProject',
          database : 'chatProject',
          password : '1q2w3e4r5t6z',
      }
    },
  
    production: {
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
    }
  
  };