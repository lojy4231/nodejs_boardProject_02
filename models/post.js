const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId: String,    
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
postSchema.virtual("postId").get(function () {
    return this._id.toHexString();
});
postSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Post", postSchema);