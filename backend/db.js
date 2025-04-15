const mysql = require('mysql2');

const credentials = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
};

const connection = mysql.createConnection(credentials);

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    
});

module.exports = connection;