const { Sequelize } = require('sequelize');

// App and database variables
const DB_NAME = process.env.DB_NAME
// const HOST = process.env.HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

// Connecting to a database (see https://sequelize.org/master/manual/getting-started.html)
// we do not add the operatorsAliases:false parameter


module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// we write our own authentication test as an alternative
// db.authenticate()
//     .then(() => console.log('Database connected ... '))
//     .catch(err => console.log('Error: ' + err))