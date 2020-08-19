var express = require('express');
var router = express.Router();
const { Client } = require('pg');

const pg_client_settings = {
    user: 'francisco',
    host: 'localhost',
    database: 'oautn',
    password: '',
    port: 5432,
}

router.get('/getAll', async (req, res) => {

    const client = new Client(pg_client_settings);
 
    await client.connect();
    const response = await client.query("SELECT * FROM libros;");
    await client.end();
    res.send(response.rows);
});

router.post('/add', async (req,res) => {
   
    const client = new Client(pg_client_settings);
    const query = `
       INSERT INTO 
       libros (
          titulo,
          descripcion
       ) VALUES (
          '${req.body.new_book_title}',
          '${req.body.new_book_description}'
       );
    `;
 
    await client.connect();   
    try {
       await client.query(query);
    } catch (err) {
       res.send({error: `Tuvimos un problema al crear el nuevo libro: ${err}`});
       return client.end();
    }
       
    res.send({succes: true});
    client.end();

});
 

module.exports = router;