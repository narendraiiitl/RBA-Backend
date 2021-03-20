const express = require('express');
const router = express.Router();
const { signAccessToken, signRefreshToken, verifyRefreshToken, verifyAccessToken } = require('../helper/jwtHelper');
const apicontroller = require('../controller/apiController');

router.post('/profile', verifyAccessToken, apicontroller.postprofile)

router.get('/profile', verifyAccessToken, apicontroller.getprofile)

router.post('/uploadimage', verifyAccessToken, apicontroller.uploadimage)

router.get('/showimage', verifyAccessToken, apicontroller.getimages)

router.delete('/deleteimage', verifyAccessToken, apicontroller.deleteimage)

router.get('/ping', verifyAccessToken, apicontroller.ping)

module.exports = router;
