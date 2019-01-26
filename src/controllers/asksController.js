const pool = require('../database');

/**
 * 
 * @param {objeto de Express} req 
 * @param {objeto de Express} res 
 * 
 * Función que devuelve las preguntas pertenecientes a una materia
 */
const asksSubject = async (req, res) =>{
    const {id} = req.params;
    const ask = await pool.query('SELECT id_pre,cod_mat,enunciado,opcion1,opcion2,opcion3,opcion4 FROM preguntas WHERE cod_mat = ?',[id]);

    if(ask.length > 0) {
        res.status(200).json({
            message: 'the query is OK',
            results: ask
        });
    }else {
        res.status(204).json({message: 'there is no content'});
    }
}

/**
 * 
 * @param {objeto de Express} req 
 * @param {objeto de Express} res 
 * 
 * Función que recibe datos desde el cliente(android app)
 * Consulta las respuestas de cada pregunta 
 * Compara la opción que se envió desde el cliente con la respuesta de la consulta
 * Asigna un 1 si la comparación es TRUE y 0 si es FALSE
 * Suma los resultados y los asigna a una variable
 * Registra por medio de un procedimiento(MYSQL) los datos de la suma de resultados(total), el código del estudiante que es recibido desde el cliente y así mismo con el código de la materia
 * 
 * Comprueba que todo salió exitoso
 * Devuelve el total de la calificación de la materia
 * 
 */
const scoreSubject = async (req, res) => {
    const data = req.body;
    const res1 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[0].pregunta]);
    const res2 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[1].pregunta]);
    const res3 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[2].pregunta]);
    const res4 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[3].pregunta]);
    const res5 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[4].pregunta]);
    const res6 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[5].pregunta]);
    const res7 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[6].pregunta]);
    const res8 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[7].pregunta]);
    const res9 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[8].pregunta]);
    const res10 = await pool.query('SELECT respuesta FROM preguntas WHERE id_pre = ?', [data[9].pregunta]);

    const score1 =res1[0].respuesta === data[0].opcion ? 1 : 0;
    const score2 =res2[0].respuesta === data[1].opcion ? 1 : 0;
    const score3 =res3[0].respuesta === data[2].opcion ? 1 : 0;
    const score4 =res4[0].respuesta === data[3].opcion ? 1 : 0;
    const score5 =res5[0].respuesta === data[4].opcion ? 1 : 0;
    const score6 =res6[0].respuesta === data[5].opcion ? 1 : 0;
    const score7 =res7[0].respuesta === data[6].opcion ? 1 : 0;
    const score8 =res8[0].respuesta === data[7].opcion ? 1 : 0;
    const score9 =res9[0].respuesta === data[8].opcion ? 1 : 0;
    const score10 =res10[0].respuesta === data[9].opcion ? 1 : 0;
    
    const {estudiante,materia} = data[0];
    const pregunta1 = data[0].pregunta,
          pregunta2 = data[1].pregunta,
          pregunta3 = data[2].pregunta,
          pregunta4 = data[3].pregunta,
          pregunta5 = data[4].pregunta,
          pregunta6 = data[5].pregunta,
          pregunta7 = data[6].pregunta,
          pregunta8 = data[7].pregunta,
          pregunta9 = data[8].pregunta,
          pregunta10 = data[9].pregunta;

    const total = score1+score2+score3+score4+score5+score6+score7+score8+score9+score10;

    answers(estudiante,materia,pregunta1,res1[0].respuesta,data[0].opcion);
    answers(estudiante,materia,pregunta2,res2[0].respuesta,data[1].opcion);
    answers(estudiante,materia,pregunta3,res3[0].respuesta,data[2].opcion);
    answers(estudiante,materia,pregunta4,res4[0].respuesta,data[3].opcion);
    answers(estudiante,materia,pregunta5,res5[0].respuesta,data[4].opcion);
    answers(estudiante,materia,pregunta6,res6[0].respuesta,data[5].opcion);
    answers(estudiante,materia,pregunta7,res7[0].respuesta,data[6].opcion);
    answers(estudiante,materia,pregunta8,res8[0].respuesta,data[7].opcion);
    answers(estudiante,materia,pregunta9,res9[0].respuesta,data[8].opcion);
    answers(estudiante,materia,pregunta10,res10[0].respuesta,data[9].opcion);
    
    await pool.query('CALL calificacion(?,?,?)',[total,materia,estudiante]);

    const scoreSubject = await pool.query('SELECT total FROM calificacion WHERE cod_mat = ? AND cod_es = ?', [materia,estudiante]);
    
    if(res1.length > 0 && res2.length > 0 && res3.length > 0 && res4.length > 0 && res5.length > 0 && res6.length > 0 && res7.length > 0 && res8.length > 0 && res9.length > 0 && res10.length > 0 && scoreSubject.length > 0) {
        res.status(200).json({
            message: 'the query is OK'
        });
    }else {
        res.status(204).json({message: 'there is no content'});
    }
}

const answers = async (estudiante,materia,pregunta,correcto,incorrecto) => {
    await pool.query('CALL respuestas(?,?,?,?,?)', [estudiante,materia,pregunta,correcto,incorrecto]);
}

module.exports = {asksSubject,scoreSubject}