
module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": "localhost",
  "username": "root",
  "password": "secret",
  "database": "bullbearinvest",
  "migrations": [
    process.env.NODE_ENV === 'production' ?
      "dist/infra/database-adapters/typeorm-adapters/typeorm-migrations/*.js" :
      "./src/infra/database-adapters/typeorm-adapters/typeorm-migrations/*.ts"
  ],
  "entities": [
    process.env.NODE_ENV === 'production' ?
      "dist/infra/database-adapters/typeorm-adapters/typeorm-entities/*.js" :
      "./src/infra/database-adapters/typeorm-adapters/typeorm-entities/*.ts"
  ],
  "cli": {
    "migrationsDir": "./src/infra/database-adapters/typeorm-adapters/typeorm-migrations"
  }
}



