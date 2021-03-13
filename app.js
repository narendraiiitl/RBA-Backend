const express = require('express');
const app = express();
const morgan = require('morgan');
const createError = require('http-errors');
const { verifyAccessToken } = require('./helper/jwtHelper');
const authRoutes=require('./routes/authRoutes');
require('dotenv').config();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', verifyAccessToken, async (req, res, next) => {
    try {
        res.send("hello from exress");
    } catch (error) {
        next(err);
    }
})

// app.use('/auth', authRoutes);

app.use(async (req, res, next) => {
    next(createError.NotFound('this route doesnot exist'));
})
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        },
    })
})

app.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}`);
})