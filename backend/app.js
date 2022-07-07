const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const dbconfig   = require('./config/database.js');
const connection = mysql.createPool(dbconfig);

const jsonParser = bodyParser.json()
app.use(cors());

// connection.connect();

// connection.query('SELECT * from board', (err, rows, fields) => {
//   if (err) throw err;
//   console.log('test: ', rows)
// })

// connection.end();

app.get('/', (req, res) => {
  res.send('Hello Wod!')
});

app.get('/articles', (req, res) => {
  connection.query('SELECT * from board', (err, rows) => {
    if (err) throw err;
    console.log(rows)
    res.send(rows);
  });
})

app.post('/article', jsonParser, (req, res) => {
  const sql = 'INSERT INTO board (title, writer, content) VALUES (?, ?, ?)';
  const title = req.body.title;
  const writer = req.body.writer;
  const content = req.body.content;
  const params = [title, writer, content];
  connection.query(sql, params, (err, rows, fileds) => {
    if (err) throw err;
    console.log(rows);
  })
})

app.get('/article/:id', (req, res, next) => {
  connection.query('SELECT * from board', (err, rows) => {
    if (err) throw err;
    const article = rows.find(art => art.idx === parseInt(req.params.id));
    if(!article) {
      return res.status(404).send('ID was not found.');
    }
    res.send(article);
  })
})

app.put('/article/:id', jsonParser, (req, res, next) => {
  connection.query('SELECT * from board', (err, rows, fildes) => {
    if (err) throw err;
    const article = rows.find(art => art.idx === parseInt(req.params.id));
    if(!article) {
      return res.status(404).send('ID was not found.');
    }
    console.log(req.body)
    const sql = 'UPDATE board SET title = ?, writer = ?, content = ? WHERE idx = ?';
    const title = req.body.title;
    const writer = req.body.writer;
    const content = req.body.content;
    const index = rows.indexOf(article);
    const params = [title, writer, content, req.params.id];
    console.log(params)
    connection.query(sql, params, (err, rows, fileds) => {
      if (err) throw err;
      console.log(rows);
    })
    res.send(article)
  })
})

app.delete('/article/:id', (req, res, next) => {
  connection.query('SELECT * from board', (err, rows, fildes) => {
    if (err) throw err;
    const article = rows.find(art => art.idx === parseInt(req.params.id));
    if(!article) {
      return res.status(404).send('ID was not found.');
    }
    connection.query('DELETE FROM board WHERE idx = ?', [req.params.id], (err, rows, fileds) => {
      if (err) throw err;
    })
    res.json('deleted: ' + req.params.id);
  })
})

app.listen(port, () => {
  console.log(`Board app listening on port ${port}`);
})