const createError = require('http-errors');
const User = require('../model/user');
const image = require('../model/image');
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helper/jwtHelper');
const client = require('../helper/initRedis');
const { response } = require('express');
const user = require('../model/user');


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
            const User = await user.findOne({ _id: aud }).exec();
            console.log(User);
            const Image = new image({ imageurl, uploader: aud });
            await Image.save()
                .then(async (savedimage) => {
                    const { _id, imageurl, uploader } = savedimage;
                    const response = { _id, imageurl, uploader, username: User.name };
                    console.log(response);
                    res.send(response);
                })
        } catch (error) {
            next(error);
        }
    },
    getimages: async (req, res, next) => {
        try {
            const resp = await image.find()
                .populate('uploader').exec();
            console.log(resp);
            res.send(resp);

        } catch (error) {
            next(error);
        }
    },
    deleteimage: async (req, res, next) => {
        try {
            const { aud } = req.payload;
            const requestedby = await user.findOne({ _id: aud }).exec();
            const { _id } = req.body;
            const User = await image
                .findOne({ _id })
                .populate('uploader')
                .exec()
            console.log({ requestedby, User });
            if (requestedby.role === "Admin")
                await image.deleteOne({ _id }).exec();
            else if (requestedby.role === 'Moderator' && User.uploader.role === "Admin")
                throw createError.Unauthorized();
            else if ((requestedby.role === 'Moderator' && User.uploader.role === "Member"))
                await image.deleteOne({ _id }).exec();
            else if (requestedby._id === User.uploader._id)
                await image.deleteOne({ _id }).exec();
            else
                throw createError.Unauthorized();
            res.sendStatus(200);
        } catch (error) {
            next(error);
        }
    }

}