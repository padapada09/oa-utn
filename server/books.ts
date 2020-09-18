import express = require('express');
import { ServerResponse, Book, Response } from 'Types';
import { DB } from 'Services';

const router = express.Router();

router.get('/get/:id', async (req, res : Response<ServerResponse<Book>>) => {

   if (req.params.id === 'all') {
      const query = `SELECT * FROM libros`;
      const response = await DB.query<Book>(query);
      res.send(response);
   } else {
      const query = `SELECT * FROM libros WHERE id = $1::uuid`;
      const response = await DB.query<Book>(query,[req.params.id]);
      res.send(response);
   }

});

router.post('/add', async (req,res : Response<ServerResponse>) => {

   const query = `
      INSERT INTO 
      libros (
         titulo,
         descripcion
      ) VALUES (
         $1::text,
         $2::text
      );
   `;

   const response = await DB.query(query,[req.body.book.titulo,req.body.book.descripcion]);

   res.send(response);
});

router.get('/remove/:book_id', async (req, res : Response<ServerResponse>) => {

   const query = `
      DELETE FROM
         libros
      WHERE id = $1::uuid;
   `;

   const response = await DB.query(query,[req.params.book_id]);
   res.send(response);
});

router.post('/edit', async (req, res) => {
   
   const query = `
      UPDATE libros
      SET 
         titulo = $1::text,
         descripcion = $2::text
      WHERE id = $3::uuid;
   `;

   const params = [
      req.body.book.titulo,
      req.body.book.descripcion,
      req.body.book.id
   ];
   
   const response = await DB.query(query,params);
   res.send(response);
});

export default router;