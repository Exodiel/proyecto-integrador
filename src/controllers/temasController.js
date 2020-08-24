const pool = require('../database');

const guardarTema = async (req, res) => {
    const { nombre_tema, tipo_tema, descripcion_tema, imagen_tema } = req.body;

    await pool.query('INSERT INTO temas(nombre_tema, tipo_tema, descripcion_tema, imagen_tema) VALUES (?,?,?,?)', [nombre_tema, tipo_tema, descripcion_tema, imagen_tema]);

    return res.status(201).json({
        data: "registrado"
    });
}

const obtenerTemas = async (req, res) => {
    const temas = await pool.query('SELECT * FROM temas');

    return res.status(200).json({
        "data": temas
    });
}

module.exports = { guardarTema, obtenerTemas }