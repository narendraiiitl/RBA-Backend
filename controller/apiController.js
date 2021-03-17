const createError = require('http-errors');
const User = require('../model/user');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helper/jwtHelper');
const client = require('../helper/initRedis');
const { response } = require('express');


module.exports = {
    getprofile: async (req, res, next) => {
        try {
            console.log(req.payload);
            const { aud } = req.payload;
            User.findOne({ _id: aud })
                .then((response) => {
                    res.send({ name: response.name, role: response.role });
                })
        } catch (error) {
            next(error);
        }
    },
    postprofile: async (req, res, next) => {
        try {
            console.log(req.payload);
            const { aud } = req.payload;
            User.findOneAndUpdate({ _id: aud }, req.body, { new: true })
                .then((response) => {
                    res.send({ name: response.name, role: response.role });
                })
        } catch (error) {
            next(error);
        }
    },

}