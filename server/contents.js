var express = require('express');
var router = express.Router();
const { Client } = require('pg');

//Mod

const pg_client_settings = {
    user: 'francisco',
    host: 'localhost',
    database: 'oautn',
    password: '',
    port: 5432,
}

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

module.exports = router;