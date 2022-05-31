const { number } = require("joi");
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userId: String,
    postNum: Number,
    commentNum: Number,
    comment: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});
commentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});
commentSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Comment", commentSchema);