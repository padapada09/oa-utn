import express = require('express');
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
   
   const query = `
      INSERT INTO preguntas 
         (id_contenido) 
      VALUES 
         ($1::uuid) 
      RETURNING 
         *,
         ARRAY(
            SELECT 
               row_to_json(respuestas)
            FROM respuestas
            WHERE respuestas.id_pregunta = preguntas.id
         ) AS respuestas;`;
   const response = await DB.query<Question[]>(query,[req.body.content_id]);
   if (response.success) {
      res.send({...response, data: response.data?.[0]});
   }
});

router.post('/delete', async (req,res) => {
   
   const query = `DELETE FROM preguntas WHERE id = $1::uuid;`;
   const response = await DB.query(query,[req.body.id]);
   return res.send(response);
});

router.post('/edit', async (req, res : Response<ServerResponse>) => {
   
   const query_question = `
      UPDATE preguntas
      SET 
         titulo = $1::text,
         descripcion = $2::text,
         dificultad = $3::integer
      WHERE id = $4::uuid;
   `;

   const question = req.body.question as Question;
   const response_question = await DB.query(query_question,[question.titulo, question.descripcion || '', String(question.dificultad), question.id]);

   const response_clear_answers = await DB.query(`DELETE FROM respuestas WHERE id_pregunta = $1::uuid`,[question.id]);
   if (!response_clear_answers.success) {
      return res.send(response_clear_answers);
   }

   for (let answer of question.respuestas) {
      const query_answer = `
         INSERT INTO respuestas
            (
               id_pregunta,
               descripcion,
               valoracion,
               feedback
            ) VALUES (
               $1::uuid,
               $2::text,
               $3::float,
               $4::text
            );
      `;
      
      const response_answer = await DB.query(query_answer,[question.id, answer.descripcion, String(answer.valoracion), answer.feedback]);
      if (!response_answer.success) {
         return res.send(response_answer);
      }
   }

   res.send(response_question);
});

export default router;