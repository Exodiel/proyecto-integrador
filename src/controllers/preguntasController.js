const pool = require('../database');


const guardarPregunta = async (req, res) => {
    const { enunciado_pregunta, opcion1, opcion2, opcion3, opcion4, respuesta, id_contenido } = req.body;

    await pool.query('INSERT INTO preguntas(enunciado_pregunta, opcion1, opcion2, opcion3, opcion4, respuesta, id_contenido) VALUES(?,?,?,?,?,?,?)', [enunciado_pregunta, opcion1, opcion2, opcion3, opcion4, respuesta, id_contenido]);

    return res.status(201).json({
        data: "ok"
    });
}

const obtenerPreguntasContenido = async (req, res) => {
    const { id } = req.params;

    const preguntas = await pool.query('SELECT * FROM preguntas WHERE id_contenido= ?', [id]);

    return res.status(200).json({
        data: preguntas
    });
}

const calcularRespuestas = async (req, res) => {
    const { data } = req.body;
    console.log(data);
}

module.exports = { guardarPregunta, obtenerPreguntasContenido, calcularRespuestas }