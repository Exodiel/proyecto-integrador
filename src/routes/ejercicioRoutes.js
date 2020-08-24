const express = require('express');
const router = express.Router();
const ejercicioRoutes = require('../controllers/ejercicioController');

router.post('/save', ejercicioRoutes.guardarEjercicio);
router.get('/all/:id_contenido', ejercicioRoutes.obtenerEjercicioContenido);

module.exports = router;