const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const dbconfig   = require('./config/database.js');

const connection = mysql.createConnection(dbconfig);

connection.connect();

connection.query('SELECT * from board', (err, rows, fields) => {
  if (err) throw err;
  console.log('test: ', rows)
})

connection.end();

app.get('/', (req, res) => {
  res.send('Hello Wod!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})