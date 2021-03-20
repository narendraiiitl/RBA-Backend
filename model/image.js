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


const image = mongoose.model("image", imageSchema);
module.exports = image
