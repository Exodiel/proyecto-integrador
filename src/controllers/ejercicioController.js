const pool = require('../database');

const guardarEjercicio = (req, res) => {
    const { tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t } = req.body;

    pool.connect();

    pool.query('INSERT INTO ejercicio(tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t) VALUES(?,?,?,?,?))', [tipo_ejercicio, enunciado_ejercicio, estado_ejercicio, id_contenido_t, id_contenido_t], function (error, results, fields) {
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

const obtenerEjercicioContenido = (req, res) => {
    const { id_contenido } = req.params;

    pool.connect();

    pool.query('SELECT * FROM ejercicio WHERE id_contenido_t= ?', [id_contenido], function (error, results, fields) {
        if (error) {
            res.status(500).json({ message: "error de servidor" });
            return;
        };

        res.status(201).json({
            data: results
        });
    });

    pool.end();

}

module.exports = { guardarEjercicio, obtenerEjercicioContenido }