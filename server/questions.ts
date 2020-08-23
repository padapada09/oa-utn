import express = require('express');
import { Client } from 'pg';
import pg_client_settings from './pg_client_settings';

const router = express.Router();

router.get('/getAll/:content_id/:current_lvl', async (req, res) => {
   
    const client = new Client(pg_client_settings);
    const get_preguntas_query = `
       SELECT
          preguntas.*
       FROM preguntas
       WHERE id_contenido = '${req.params.content_id}'
       ORDER BY ABS((dificultad/2)-(${req.params.current_lvl}*(
       SELECT
         MAX(dificultad) 
       FROM (
         SELECT * FROM preguntas
         ORDER BY dificultad
         LIMIT 5
       ) AS ordered_preguntas
       ))*(select MAX(dificultad) from preguntas)*RANDOM()) ASC
       LIMIT 5;
    `;
 
    await client.connect();
    const preguntas_response = await client.query(get_preguntas_query);
    await client.end();

    res.send(preguntas_response.rows);
});

router.post('/add', async (req,res) => {
   
    const client = new Client(pg_client_settings);
    const query = `
       INSERT INTO preguntas (
          titulo,
          descripcion,
          respuestas_erroneas,
          respuesta_correcta,
          dificultad,
          id_contenido
       ) VALUES (
          '${req.body.new_question_title}',
          '${req.body.new_question_description}',
          '{${req.body.new_question_wrong_answers.map((wrong_answer,index) => `"${wrong_answer}"`)}}',
          '${req.body.new_question_answer}',
          '${req.body.new_question_dificulty}',
          '${req.body.content_id}'
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