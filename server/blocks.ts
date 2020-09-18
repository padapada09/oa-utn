import express = require('express');
import { ServerResponse, Block, Response, Title, Text } from 'Types';
import { DB } from 'Services';

const router = express.Router();

router.get('/get/:content_id', async (req, res : Response<ServerResponse<Block>>) => {
   
   const query = `
      SELECT * FROM (
         SELECT DISTINCT * FROM bloques
         LEFT JOIN textos ON textos.id_bloque = bloques.id
         LEFT JOIN imagenes ON imagenes.id_bloque = bloques.id
         LEFT JOIN titulos ON titulos.id_bloque = bloques.id
         WHERE bloques.id_contenido = $1::uuid
      ) AS bloques
      ORDER BY bloques.orden;
   `;
   
   const response = await DB.query<Block>(query,[req.params.content_id]);
   res.send(response);
});

router.post('/add/:content_id', async (req,res : Response<ServerResponse>) => {
   
   const block = req.body.block;

   const reordering_query = `
      UPDATE bloques set orden = orden + 1
      WHERE orden >= $1::integer;
   `;

   const reordering_response = await DB.query(reordering_query,[block.orden]);
   if (!reordering_response.success) return res.send({
      success: false, 
      error: "Tuvimos un problema al reordenar los bloques"
   });

   const query = `
      INSERT INTO 
      bloques (
         tipo,
         id_contenido,
         orden
      ) VALUES (
         $1::text,
         $2::uuid,
         $3::integer
      ) RETURNING *;
   `;
   
   const response = await DB.query<Block>(query,[block.tipo,req.params.content_id,block.orden]);

   if (!response.success) return res.send(response);

   const [inserted_block] = response.data as Block[];

   switch (inserted_block.tipo) {
      case 'Titulo':
         const {titulo} = block as Title;
         const title_query = `INSERT INTO titulos VALUES ($1::uuid, $2::text);`;
         const title_response = await DB.query<Block>(title_query,[inserted_block.id,titulo]);
         res.send(title_response);
         break;
      case 'Texto':
         const {texto} = block as Text;
         const text_query = `INSERT INTO textos VALUES ($1::uuid, $2::text);`;
         const text_response = await DB.query<Block>(text_query,[inserted_block.id,texto]);
         res.send(text_response);
         break;
      default:
         res.send({success: false, error: "No existe el tipo de bloque que se intenta agregar"});
   };
});

router.get('/remove/:block_id', async (req,res : Response<ServerResponse>) => {
   
   const query = `
      DELETE FROM bloques
      WHERE id = $1::uuid returning orden;
   `;

   const response = await DB.query<Block>(query,[req.params.block_id]);
   const [{orden}] = response.data as Block[];

   if (!response.success) res.send({success: false, error: "Tuvimos un problema al eliminar el bloque"});

   const reordering_query = `
      UPDATE bloques SET orden = orden - 1
      WHERE orden > $1::integer;
   `;

   const reordering_response = await DB.query(reordering_query,[String(orden)]);

   res.send(reordering_response);

});

router.post('/update', async (req,res : Response<ServerResponse>) => {
   
   const block : Block = req.body.block;

   switch (block.tipo) {
      case 'Titulo':
         const {titulo} = block as Title; 
         const titles_query = `UPDATE titulos SET titulo = $1::text WHERE id_bloque = $2::uuid`;
         const titles_response = await DB.query(titles_query,[titulo,block.id]);
         res.send(titles_response);
         break;
      case 'Texto':
         const {texto} = block as Text; 
         const textos_query = `UPDATE textos SET texto = $1::text WHERE id_bloque = $2::uuid`;
         const textos_response = await DB.query(textos_query,[texto,block.id]);
         res.send(textos_response);
         break;
   };

});

router.get('/sort/:block_id/:new_index/:previous_index', async (req,res : Response<ServerResponse>) => {
   
   const query = `
      UPDATE bloques
      SET orden = $1::integer
      WHERE id = $2::uuid;
   `;
   
   const response = await DB.query(query,[req.params.new_index,req.params.block_id]);

   if (!response.success) return res.send({success: false, error: "Tuvimos un problema al actualizar el orden del bloque"});

   if (req.params.previous_index > req.params.new_index) {
      const reordering_query = `
         UPDATE bloques
         SET orden = orden + 1
         WHERE orden >= $1::integer AND orden < $2::integer AND id <> $3::uuid;
      `;
      const reordering_response = await DB.query(reordering_query,[req.params.new_index,req.params.previous_index,req.params.block_id]);
      res.send(reordering_response);
   } else {

      const reordering_query = `
         UPDATE bloques
         SET orden = orden - 1
         WHERE orden <= $1::integer AND orden > $2::integer AND id <> $3::uuid;
      `;

      const reordering_response = await DB.query(reordering_query,[req.params.new_index,req.params.previous_index,req.params.block_id]);

      res.send(reordering_response);
   }
});

export default router;