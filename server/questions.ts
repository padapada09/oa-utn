import express = require('express');
import { Client } from 'pg';
import pg_client_settings from './pg_client_settings';
import { ServerResponse, Question, Response } from 'Types';
import { DB } from 'Services';

const router = express.Router();

router.get('/get/:content_id/:current_lvl', async (req, res : Response<ServerResponse<Question>>) => {
   
   const query = `
      SELECT
         preguntas.*,
         ARRAY(
            SELECT 
               row_to_json(respuestas)
            FROM respuestas
            WHERE respuestas.id_pregunta = preguntas.id
         ) AS respuestas
      FROM preguntas
      WHERE id_contenido = $1::uuid
      ORDER BY ABS((dificultad/2)-($2::float*(
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

   const response = await DB.query<Question>(query,[req.params.content_id,req.params.current_lvl]);
   res.send(response);
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
          '{${req.body.new_question_wrong_answers.map((wrong_answer : any,index : any) => `"${wrong_answer}"`)}}',
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

router.post('/edit', async (req, res : Response<ServerResponse>) => {
   
   const query = `
      UPDATE preguntas
      SET 
         titulo = $1::text,
         descripcion = $2::text
      WHERE id = $3::uuid;
   `;

   const question = req.body.question as Question;

   const response = await DB.query(query,[question.titulo, question.descripcion || '', question.id]);
   res.send(response);
});

export default router;