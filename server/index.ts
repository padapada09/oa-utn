import express = require('express');
import bodyParser = require('body-parser');
import cors = require('cors');
import Books from './books';
import Contents from './contents';
import Blocks from './blocks';
import Questions from './questions';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(`/books`, Books);
app.use(`/contents`, Contents);
app.use(`/blocks`, Blocks);
app.use(`/questions`, Questions);

app.listen(4000, () => {
   console.log(`Server is up in port 4000`);
});