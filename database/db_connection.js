const mysql = require('mysql')

var connection;

if(typeof connection === 'undefined'){

connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'ecommerce'
});

connection.connect();
}


module.exports = connection;