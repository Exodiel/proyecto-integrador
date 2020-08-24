const express = require('express');
const router = express.Router();
const contenidoRoutes = require('../controllers/contenidoController');

router.post('/save', contenidoRoutes.guardarContenido);
router.get('/all/:id_tema', contenidoRoutes.obtenerContenidos);

module.exports = router;