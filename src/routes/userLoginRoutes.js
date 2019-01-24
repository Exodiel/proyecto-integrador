const express = require('express');
const router = express.Router();
const login = require('../controllers/userLoginController');

router.post('/login',login.userLogin);

module.exports = router;
