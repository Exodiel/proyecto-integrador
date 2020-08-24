const pool = require('../database');


const guardarTema = (req, res) => {
    const { nombre_tema, tipo_tema, descripcion_tema, imagen_tema } = req.body;

    pool.connect();

    pool.query('INSERT INTO temas(nombre_tema, tipo_tema, descripcion_tema, imagen_tema VALUES (?,?,?,?) )', [nombre_tema, tipo_tema, descripcion_tema, imagen_tema], function (error, results, fields) {
        if (error) {
            return res.status(500).json({ message: error });
        };

        return res.status(201).json({
            data: "registrado"
        });
    });


    pool.end();
}


const obtenerTemas = (req, res) => {
    pool.connect();
    pool.query('SELECT * FROM temas', function (error, results, fields) {
        if (error) {
            return res.status(500).json({ message: error });
        }

        return res.status(200).json({
            "data": results
        });

    });

    pool.end();
}

module.exports = { guardarTema, obtenerTemas }