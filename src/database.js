const mysql = require('promise-mysql');
const database = require('./keys');

const pool = mysql.createPool(database);

pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is connect');
    })
    .catch(err => console.error(err));

module.exports = pool;
