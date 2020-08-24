const pool = require('../database');


const guardarContenido = (req, res) => {
    const { tema_contenido, tipo_contenido, descripcion_contenido, id_tema } = req.body;

    pool.connect();

    pool.query('INSERT INTO contenido_teorico(tema_contenido, tipo_contenido, descripcion_contenido, imagen_tema VALUES (?,?,?,?) )', [tema_contenido, tipo_contenido, descripcion_contenido, id_tema], function (error, results, fields) {
        if (error) {
            res.status(500).json({ message: "error de servidor" });
            return;
        };

        res.status(201).json({
            data: "registrado"
        });
    });

    pool.end();

}


const obtenerContenidos = (req, res) => {
    const { id_tema } = req.params;

    pool.connect();

    pool.query('SELECT * FROM contenido_teorico WHERE id_tema = ?', [id_tema], function (error, results, fields) {
        if (error) {
            res.status(500).json({ message: "error de servidor" });
            return;
        }

        res.status(200).json({
            data: results
        });
    });

    pool.end();
}


module.exports = { guardarContenido, obtenerContenidos }