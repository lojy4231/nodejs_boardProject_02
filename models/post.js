const mongoose = require("mongoose");

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
        default: Date.now
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