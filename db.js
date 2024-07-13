const mysql = require('mysql2');

const con = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "Root#123",
  database : "twitter_backend_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("database connected successfully!");
});

module.exports = con;