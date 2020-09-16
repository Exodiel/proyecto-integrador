const pool = require('../database');

const guardarEjercicio = async (req, res) => {
    const { tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t } = req.body;

    await pool.query('INSERT INTO ejercicio(tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t) VALUES(?,?,?,?)', [tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t]);

    return res.status(201).json({
        data: "ok"
    });

}

const obtenerEjercicioContenido = async (req, res) => {
    const { id } = req.params;

    const ejercicios = await pool.query('SELECT * FROM ejercicio WHERE id_contenido_t= ?', [id]);

    return res.status(200).json({
        data: ejercicios
    });

}

const obtenerEjercicio = async (req, res) => {
    const { id } = req.params;

    const ejercicio = await pool.query('SELECT * FROM ejercicio WHERE id_ejercicio = ?', [id]);

    return res.status(200).json({
        data: ejercicio
    });
}

module.exports = { guardarEjercicio, obtenerEjercicioContenido, obtenerEjercicio }