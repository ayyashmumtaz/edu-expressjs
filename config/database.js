let mysql = require('mysql');

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db_edu'
});

connection.connect(function (err) {
    if(!!err) {
        console.log(err);
    }else {
        console.log('Connected');
    }
});

module.exports = connection;