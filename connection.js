const mysql = require("mysql");

const koneksi = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "indo_film"
});

module.exports = koneksi;
