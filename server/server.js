// const path = require('path');
// const publicPath = path.join(__dirname, '..', 'build');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 4000;
const { Client } = require('pg');
const Contents = require('./contents');
const Books = require('./books');
const Blocks = require('./blocks');
const Questions = require('./questions');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(`/contents`, Contents);
app.use(`/books`, Books);
app.use(`/blocks`, Blocks);
app.use(`/questions`, Questions);

app.listen(port, () => {
   console.log('Server is up!');
});