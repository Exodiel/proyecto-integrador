const express = require('express');
const router = express.Router();
const subject = require('../controllers/subjectController');

router.get('/subject/:id',subject.subjectUser);
router.post('/subject',subject.userScore);
router.post('/subject/user',subject.getUserScore);
router.get('/subject/user/:id',subject.getUserOnly);

module.exports = router;