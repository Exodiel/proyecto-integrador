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
    const result = await pool.query('CALL notas(?,?)', [id_es,promedio]);
    if (result) {
        res.status(200).json({message: 'Guardado correctamente'});
    } else {
        res.status(404).json({
            message: 'Error en el servidor'
        });
    }
}

const getUserScore = async (req, res) => {
    const {cod_es,cod_mat,cod_pre} = req.body;
    const result = await pool.query('CALL nota_est(?,?,?)',[cod_es,cod_mat,cod_pre]);

    if (result.length > 0) {
        res.status(200).json({
            results: result
        });
    } else {
        res.status(404).json({
            message: 'Error en el servidor'
        });
    }
}


module.exports = {subjectUser,userScore,getUserScore};