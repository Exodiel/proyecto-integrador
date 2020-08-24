const express = require('express');
const router = express.Router();
const preguntaRoutes = require('../controllers/preguntasController');

router.post('/pregunta/save', preguntaRoutes.guardarPregunta);
router.get('/pregunta/all/:id/contenido', preguntaRoutes.obtenerPreguntasContenido);

module.exports = router;