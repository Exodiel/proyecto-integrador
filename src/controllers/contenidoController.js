const pool = require('../database');


const guardarContenido = async (req, res) => {
    const { tema_contenido, tipo_contenido, descripcion_contenido, id_tema } = req.body;

    await pool.query('INSERT INTO contenido_teorico(tema_contenido, tipo_contenido, descripcion_contenido, id_tema) VALUES (?,?,?,?)', [tema_contenido, tipo_contenido, descripcion_contenido, id_tema]);

    return res.status(201).json({
        data: "registrado"
    });

}


const obtenerContenidosPorTemas = async (req, res) => {
    const { id } = req.params;

    const results = await pool.query('SELECT * FROM contenido_teorico WHERE id_tema = ?', [id]);

    return res.status(200).json({
        data: results
    });

}


module.exports = { guardarContenido, obtenerContenidosPorTemas }