import express = require('express');
import { Client } from 'pg';
import pg_client_settings from './pg_client_settings';

const router = express.Router();

router.get('/getAll', async (req, res) => {

   const client = new Client(pg_client_settings);
   try {
      await client.connect();
   } catch (err) {
      res.send({
         error: "Tuvimos un problema al conectarnos con la base de datos;", 
         incoming_error: err
      });
   } finally {
      const query = `SELECT * FROM libros;`;
      const response = await client.query(query);
      res.send(response.rows);
      client.end();
   }
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
 
export default router;