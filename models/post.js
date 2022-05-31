const mongoose = require("mongoose");
let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

const postSchema = new mongoose.Schema({
    userId: String,
    postNum: {
        type: Number,
        required: true,
        unique: true,
    }, 
    title: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    content: {
        type: String,
        required: true,
    },
});
postSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Post", postSchema);