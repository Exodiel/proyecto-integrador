const express = require('express');
const router = express.Router();
const ejercicioRoutes = require('../controllers/ejercicioController');

router.post('/ejercicio/save', ejercicioRoutes.guardarEjercicio);
router.get('/ejercicio/all/:id/contenido', ejercicioRoutes.obtenerEjercicioContenido);
router.get('/ejercicio/:id');

module.exports = router;