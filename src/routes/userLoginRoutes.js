const express = require('express');
const router = express.Router();
const login = require('../controllers/userLoginController');

router.post('/login',login.userLogin);
router.post('/state',login.getState);

module.exports = router;
