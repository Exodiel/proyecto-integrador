const pool = require('../database');

/**
 * Función que me devuelve las materias pertenecientes a un estudiante
 */
const subjectUser = async (req, res) => {
    const {id} = req.params;
    const subjects = await pool.query('SELECT id_mat,nom_mat,imagen, total FROM estudiante AS es,materia AS mat,detalle_materia AS dt, calificacion as cal WHERE mat.id_mat = dt.cod_mat AND dt.cod_es = es.id_es AND cal.cod_mat=mat.id_mat AND cal.cod_es=es.id_es AND es.id_es = ?',[id]);
    if (subjects.length > 0) {
        res.status(200).json({
            message: 'the query is OK',
            results: subjects
        });
    }else {
        res.status(204).json({
            message: 'there is no content to show'
        });
    }
}

const userScore = async (req, res) => {
    const {id_es, nota1, nota2, nota3, nota4} = req.body
    const promedio = (nota1+nota2,nota3+nota4)/4;
    const result = await pool.query('INSERT INTO notas(cod_es,nota)', [id_es,promedio]);
    if (result) {
        res.status(200).json({message: 'Guardado correctamente'});
    } else {
        res.status(404).json({
            message: 'Error en el servidor'
        });
    }
}

const getUserScore = async (req, res) => {
    const {cod_es,cod_mat} = req.body;
    const result = await pool.query('select nom_mat,correcto,incorrecto from respuestas,materia where cod_mat=id_mat and cod_es=? and cod_mat=?',[cod_es,cod_mat]);

    if (result.length > 0) {
        res.status(200).json({
            results: result
        });
    } else {
        res.status(404).json({
            message: 'No hay contenido'
        });
    }
}

const getUserOnly = async (req, res) => {
    const {id} = req.params;
    const query = await pool.query('SELECT * FROM notas WHERE cod_es = ?',[id]);

    if (query.length > 0) {
        res.status(200).json({
            query
        });
    } else {
        res.status(404).json({
            message: 'No hay contenido'
        });
    }
};


module.exports = {subjectUser,userScore,getUserScore,getUserOnly};