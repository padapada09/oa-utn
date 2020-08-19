// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors')
// const publicPath = path.join(__dirname, '..', 'build');
const port = process.env.PORT || 4000;
const { Client } = require('pg');
const Contents = require('./contents');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(`/contents`, Contents);

app.get('/getLibros', async (req, res) => {

   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

   const response = await client.query("SELECT * FROM libros;");

   res.send(response.rows);

   await client.end();
});

app.get('/getContenidos', async (req, res) => {

   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

   const query = `
      SELECT
         contenidos.*,
         (CASE WHEN contenidos.dependencias IS NULL THEN '{}' ELSE contenidos.dependencias END),
         (
            SELECT
               COALESCE(CAST(SUM(dificultad) as int),0)
            FROM (
               SELECT
                  dificultad,
                  id_contenido
               FROM preguntas
               ORDER BY dificultad DESC
            ) AS preguntas_ordenadas
            WHERE preguntas_ordenadas.id_contenido = contenidos.id
            LIMIT 5
         ) AS puntaje_maximo
      FROM contenidos
      WHERE id_libro = '${req.query.book_id}';
   `;

   const response = await client.query(query);

   res.send(response.rows);

   await client.end();
});

app.get('/getBloques', async (req, res) => {
   
   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

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
      WHERE id_contenido = '${req.query.content_id}'
      order by bl.orden;
   `;

   const response = await client.query(query);

   res.send(response.rows);

   await client.end();
});

app.get('/getRevision', async (req, res) => {
   
   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

   const get_preguntas_query = `
      SELECT
         preguntas.*
      FROM preguntas
      WHERE id_contenido = '${req.query.content_id}'
      ORDER BY ABS((dificultad/2)-(${req.query.current_lvl}/(
      SELECT
         SUM(dificultad) 
      FROM (
         SELECT * FROM preguntas
         ORDER BY dificultad
         LIMIT 5
      ) AS ordered_preguntas
      ))*(select MAX(dificultad) from preguntas)*RANDOM()) ASC
      LIMIT 5;
   `;

   const preguntas_response = await client.query(get_preguntas_query);

   res.send(preguntas_response.rows);

   await client.end();
});

app.post('/addContent', bodyParser.json(), async (req,res) => {
   
   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

   const add_content = `
      INSERT INTO 
      contenidos (
         titulo,
         descripcion,
         id_libro,
         dependencias
      ) VALUES (
         '${req.body.new_content_title}',
         '${req.body.new_content_description}',
         '${req.body.book_id}'
         ${
               req.body.new_content_dependencies ? 
               `,'{${req.body.new_content_dependencies.map(dependency => `"${dependency}"`)}}'` 
               :  ''
         }
      );
   `;

   try {
      await client.query(add_content);
   } catch (err) {
      res.send({error: `Tuvimos un problema al crear el nuevo contenido: ${err}`});
      return client.end();
   }
      
   res.send({succes: true});

   client.end();
});

app.post('/addBook', bodyParser.json(), async (req,res) => {
   
   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

   const add_book = `
      INSERT INTO 
      libros (
         titulo,
         descripcion
      ) VALUES (
         '${req.body.new_book_title}',
         '${req.body.new_book_description}'
      );
   `;
      
   try {
      await client.query(add_book);
   } catch (err) {
      res.send({error: `Tuvimos un problema al crear el nuevo libro: ${err}`});
      return client.end();
   }
      
   res.send({succes: true});

   client.end();
});

app.post('/addBlock', bodyParser.json(), async (req,res) => {
   
   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

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

app.post('/deleteBlock', bodyParser.json(), async (req,res) => {
   
   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

   const add_book = `
      DELETE FROM bloques
      WHERE id = '${req.body.block_id}'
   `;

   const update_next_block = `
      UPDATE bloques
      SET id_bloque_anterior = ${req.body.previous_block_id ? `'${req.body.previous_block_id}'` : 'null'}
      WHERE id_bloque_anterior = '${req.body.block_id}'
   `
      
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

app.post('/addQuestion', bodyParser.json(), async (req,res) => {
   
   const client = new Client({
      user: 'francisco',
      host: 'localhost',
      database: 'oautn',
      password: '',
      port: 5432,
   });

   await client.connect();

   const add_question = `
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

   try {
      await client.query(add_question);
   } catch (err) {
      res.send({error: `Tuvimos un problema al crear el nuevo libro: ${err}`});
      return client.end();
   }
      
   res.send({succes: true});

   client.end();
});

app.listen(port, () => {
   console.log('Server is up!');
});