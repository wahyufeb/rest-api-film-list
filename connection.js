const mysql = require('mysql')

const koneksi = mysql.createConnection({
    host:'localhost',
    user:'root',
    database:'nodejs_rest_api'
})

module.exports = koneksi;
