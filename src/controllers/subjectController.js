const pool = require('../database');

/**
 * Función que me devuelve las materias pertenecientes a un estudiante
 */
const subjectUser = async (req, res) => {
    const {id} = req.params;
    const subjects = await pool.query('SELECT id_mat,nom_mat,imagen FROM estudiante AS es,materia AS mat,detalle_materia AS dt WHERE mat.id_mat = dt.cod_mat AND dt.cod_es = es.id_es AND es.id_es = ?',[id]);
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
        res.status(200).json({message: 'the query is OK'});
    } else {
        res.status(404).json({
            message: 'not saved'
        });
    }
}

const getSubjectScore = async (req, res) => {
    const {cod_mat, cod_es} = req.body;

    const scoreSubject = await pool.query('SELECT total FROM calificacion WHERE cod_mat = ? AND cod_es = ?', [cod_mat,cod_es]);
    
    if (scoreSubject.length > 0) {
        res.status(200).json({result: scoreSubject[0].total});
    } else {
        res.status(204).json({message: 'there is no content'});
    }
}

module.exports = {subjectUser,userScore,getSubjectScore};