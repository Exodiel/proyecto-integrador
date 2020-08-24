const mysql = require('mysql');
const database = require('./keys');

let conexion = mysql.createConnection(database);

module.exports = conexion;
