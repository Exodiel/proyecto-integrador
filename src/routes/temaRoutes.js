const express = require('express');
const router = express.Router();
const temaRoutes = require('../controllers/temasController');

router.post('/tema/save', temaRoutes.guardarTema);
router.get('/tema/all', temaRoutes.obtenerTemas);

module.exports = router;