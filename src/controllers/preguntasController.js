const pool = require('../database');


const guardarPregunta = (req, res) => {
    const { enunciado_pregunta, opcion1, opcion2, opcion3, opcion4, respuesta, id_contenido } = req.body;

    pool.connect();

    pool.query('INSERT INTO preguntas(enunciado_pregunta, opcion1, opcion2, opcion3, opcion4, respuesta, id_contenido) VALUES(?,?,?,?,?,?,?))', [enunciado_pregunta, opcion1, opcion2, opcion3, opcion4, respuesta, id_contenido], function (error, results, fields) {
        if (error) {
            res.status(500).json({ message: "error de servidor" });
            return;
        };

        res.status(201).json({
            data: "ok"
        });
    });

    pool.end();

}

const obtenerPreguntasContenido = (req, res) => {
    const { id_contenido } = req.params;

    pool.connect();

    pool.query('SELECT * FROM preguntas WHERE  id_contenido= ?', [id_contenido], function (error, results, fields) {

        res.status(201).json({
            data: results
        });
    });

    pool.end();
}

module.exports = { guardarPregunta, obtenerPreguntasContenido }