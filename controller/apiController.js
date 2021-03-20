const createError = require('http-errors');
const User = require('../model/user');
const image = require('../model/image');
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
    ping: async (req, res, next) => {
        try {
            res.send(req.payload);
        } catch (error) {
            next(error);
        }
    },
    uploadimage: async (req, res, next) => {
        try {
            const { aud } = req.payload;
            const { imageurl } = req.body;
            console.log({ aud, imageurl });

            const Image = new image({ imageurl, uploader: aud });
            await Image.save()
                .then(async (savedimage) => {
                    console.log(savedimage);
                    res.send(savedimage);
                })
        } catch (error) {
            next(error);
        }
    },
    getimages: async (req, res, next) => {
        try {
            image.find({}, (err, response) => {
                if (err) throw createError.InternalServerError();
                console.log(response);
                res.send(response);
            })
        } catch (error) {
            next(error);
        }
    },
    deleteimage: async (req, res, next) => {
        try {
            const { aud } = req.payload;
            const { _id } = req.body;
            console.log({ aud, _id });
            User.find({ _id: aud }, (err, user) => {
                if (err) throw createError.InternalServerError();
                if (user.role == 'Admin') {
                    image.findOneAndDelete({ _id }, function (err, docs) {
                        if (err) {
                            throw createError.InternalServerError();
                        }
                        else {
                            console.log("Deleted image : ", docs);
                        }
                    });

                }
                else if(user.role)


            })


            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

}