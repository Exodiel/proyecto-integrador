const express = require('express');
const router = express.Router();
const asks = require('../controllers/asksController');


router.get('/asks/:id', asks.asksSubject);
router.post('/asks',asks.scoreSubject);

module.exports = router;