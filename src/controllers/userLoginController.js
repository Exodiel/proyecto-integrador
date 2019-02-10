const pool = require('../database');

const userLogin = async (req, res) => {
    const {nombre,cedula} = req.body;
    const login = await pool.query('SELECT * FROM estudiante WHERE nombre = ? AND cedula = ?',[nombre,cedula]);
    if(login.length > 0){
        if(login[0].cedula == cedula && login[0].nombre == nombre) {
            res.status(200).json({
                result: login[0]
            });
        }else {
            res.status(204).json({message: 'nombre o cedula no encontradas'});
        }
    }else {
        res.status(404).json({message: 'Credenciales incorrectas'});
    }
}

const getState = async (req, res) => {
    const {id_es} = req.body;
    const state = await pool.query('SELECT estado FROM estudiante WHERE id_es = ?',[id_es]);

    if (state.length > 0) {
        res.status(200).json({
            result: state[0]
        });
    }else {
        res.state(404).json({message:'No se encontró el dato'});
    }
}

module.exports = {userLogin,getState};