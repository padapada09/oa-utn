import express = require('express');
import { Client } from 'pg';
import pg_client_settings from './pg_client_settings';
import { Content, Response, ServerResponse } from 'Types';
import { DB } from 'Services';

const router = express.Router();

router.get(`/get/:book_id`, async (req, res : Response<ServerResponse<Content>>) => {
    
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
        WHERE id_libro = $1::uuid;
    `;
    
    const response = await DB.query<Content>(query,[req.params.book_id]);
    res.send(response);
});

router.get(`/getMaxScore/:content_id`,async (req,res) => {

    const content_id = req.params.content_id;
    const client = new Client(pg_client_settings);
    const query = `
        SELECT
            SUM(dificultad)
        FROM (
            SELECT
                dificultad
            FROM
                preguntas
            WHERE id_contenido = '${content_id}'
            ORDER BY dificultad DESC
            LIMIT 5
        ) AS preguntas;
    `;

    await client.connect();
    const response = await client.query(query);
    await client.end();

    res.send(response.rows[0].sum);
});

router.post(`/add`, async (req,res) => {
   
    const client = new Client(pg_client_settings);
    const query = `
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
                `,'{${req.body.new_content_dependencies.map((dependency : any)  => `"${dependency}"`)}}'` 
                :  ''
          }
       );
    `;
        
    await client.connect();
    try {
       await client.query(query);
    } catch (err) {
       res.send({error: `Tuvimos un problema al crear el nuevo contenido: ${err}`});
       return client.end();
    }
       
    res.send({succes: true});
    client.end();
});

router.post('/edit', async (req, res) => {
   
    const query = `
       UPDATE contenidos
       SET 
          titulo = $1::text,
          descripcion = $2::text,
          dependencias = $3
       WHERE id = $4::uuid;
    `;
 
    const params = [
       req.body.content.titulo,
       req.body.content.descripcion,
       req.body.content.dependencias,
       req.body.content.id
    ];
    
    const response = await DB.query(query,params);
    res.send(response);
 });
 

export default router;