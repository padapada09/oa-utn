import express = require('express');
import { Client } from 'pg';
import pg_client_settings from './pg_client_settings';

const router = express.Router();

router.get('/getAll/:content_id', async (req, res) => {
   
    const client = new Client(pg_client_settings);
    const query = `
       with recursive bl (id,tipo,contenido, id_contenido, id_bloque_anterior,orden) as (
          select b.id,b.tipo, b.contenido, b.id_contenido, b.id_bloque_anterior, 1 as orden
             from bloques b where b.id_bloque_anterior is null
          union all
          select b.id,b.tipo,b.contenido, b.id_contenido, b.id_bloque_anterior,bl.orden+1 as orden
             from bloques b 
             inner join bl on bl.id = b.id_bloque_anterior
       )
       select bl.* from bl
       WHERE id_contenido = '${req.params.content_id}'
       order by bl.orden;
    `;
 
    await client.connect();
    const response = await client.query(query);
    await client.end();

    res.send(response.rows);
});

router.post('/add', async (req,res) => {
   
    const client = new Client(pg_client_settings);
    const add_book = `
       INSERT INTO 
       bloques (
          tipo,
          contenido,
          id_contenido
          ${req.body.previous_block_id === null ? '' : ', id_bloque_anterior'}
       ) VALUES (
          '${req.body.new_block_type}',
          '${req.body.new_block_content}',
          '${req.body.content_id}'
          ${req.body.previous_block_id === null ? '' : `, '${req.body.previous_block_id}'`}
       ) returning id;
    `;
 
    await client.connect();
       
    try {
       const id = (await client.query(add_book)).rows[0].id;
       if (req.body.next_block_id) {
 
          const atatch_next_block = `
             UPDATE bloques
             SET id_bloque_anterior = '${id}'
             WHERE id = '${req.body.next_block_id}';
          `;
          await client.query(atatch_next_block);
       }
    } catch (err) {
       res.send({error: `Tuvimos un problema al crear el nuevo libro: ${err}`});
       return client.end();
    }
       
    res.send({succes: true});
 
    client.end();
});

router.post('/delete', async (req,res) => {
   
    const client = new Client(pg_client_settings);
    
    const add_book = `
       DELETE FROM bloques
       WHERE id = '${req.body.block_id}'
    `;
    
    const update_next_block = `
       UPDATE bloques
       SET id_bloque_anterior = ${req.body.previous_block_id ? `'${req.body.previous_block_id}'` : 'null'}
       WHERE id_bloque_anterior = '${req.body.block_id}'
    `
 
    await client.connect();
    
    try {
       await client.query(update_next_block);
       await client.query(add_book);
    } catch (err) {
       res.send({error: `Tuvimos un problema al crear el nuevo libro: ${err}`});
       return client.end();
    }
       
    res.send({succes: true});
 
    client.end();
});

export default router;