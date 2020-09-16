const express = require('express');
const router = express.Router();
const preguntaRoutes = require('../controllers/preguntasController');

router.post('/pregunta/save', preguntaRoutes.guardarPregunta);
router.get('/pregunta/all/:id/contenido', preguntaRoutes.obtenerPreguntasContenido);
router.post('/pregunta/calculate', preguntaRoutes.calcularRespuestas);

module.exports = router;