const express = require('express');
const router = express.Router();
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../helper/jwtHelper');
const apicontroller = require('../controller/apiController');

router.post('/profile', verifyAccessToken, apicontroller.postprofile)

router.get('/profile', verifyAccessToken, apicontroller.getprofile)

module.exports = router;
