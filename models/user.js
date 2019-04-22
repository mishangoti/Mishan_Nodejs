const mysql = require('mysql');

const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_routes'
});
// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;