const express = require('express');
const router = express.Router();
const subject = require('../controllers/subjectController');

router.get('/subject/:id',subject.subjectUser);
router.post('/subject',subject.userScore);
router.get('/subject/score');

module.exports = router;