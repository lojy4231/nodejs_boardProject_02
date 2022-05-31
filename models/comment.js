const mongoose = require("mongoose");
let moment = require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");

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
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
});
commentSchema.virtual("commentId").get(function () {
    return this._id.toHexString();
});
commentSchema.set("toJSON", {
    virtuals: true,
});

module.exports = mongoose.model("Comment", commentSchema);