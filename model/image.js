const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    imageurl: {
        type: String,
        required: true,
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
})

imageSchema.pre('save', async function (next) {
    try {
        console.log("here");
        next();
    } catch (error) {

    }
})

const image = mongoose.model("image", imageSchema);
module.exports = image
