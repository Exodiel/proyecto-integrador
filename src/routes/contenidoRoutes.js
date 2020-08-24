const express = require('express');
const router = express.Router();
const contenidoRoutes = require('../controllers/contenidoController');

router.post('/contenido/save', contenidoRoutes.guardarContenido);
router.get('/contenido/all/:id/temas', contenidoRoutes.obtenerContenidosPorTemas);

module.exports = router;