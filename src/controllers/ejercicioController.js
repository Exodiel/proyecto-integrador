const pool = require('../database');

const guardarEjercicio = async (req, res) => {
    const { tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t } = req.body;

    await pool.query('INSERT INTO ejercicio(tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t) VALUES(?,?,?,?,?))', [tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t, id_contenido_t]);

    return res.status(201).json({
        data: "ok"
    });

}

const obtenerEjercicioContenido = async (req, res) => {
    const { id_contenido } = req.params;

    const ejercicios = await pool.query('SELECT * FROM ejercicio WHERE id_contenido_t= ?', [id_contenido]);

    return res.status(200).json({
        data: ejercicios
    });

}

module.exports = { guardarEjercicio, obtenerEjercicioContenido }