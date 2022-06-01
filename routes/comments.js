const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");


//댓글 조회
router.get("/comment/:postNum", async (req, res) => {
    const { postNum } = req.params;

    const comment = await Comment.find({ postNum: Number(postNum) }).sort("-commentNum").exec();

    res.json({
        comment,
    });
});

// 댓글 작성
router.post("/post/:postNum/comment/", authMiddleware, async (req, res) => {
    try {
        const { userId } = res.locals.user;
        const { postNum } = req.params
        const { comment, date } = req.body;

        const maxCommnetNum = await Comment.findOne().sort("-commentNum").exec();
        let commentNum = 1;

        if (maxCommnetNum) {
            commentNum = maxCommnetNum.commentNum + 1;
        };

        const exisComment = await Comment.find({ userId, postNum: Number(postNum) }).exec();
        if (exisComment) {
            const newComment = new Comment({ userId, postNum, commentNum, date, comment });
            await newComment.save();
        }
        res.json({ success: true });

    } catch (err) {
        console.log(err)
    }
});

// 댓글 수정
router.put("/comment/:commentNum", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { commentNum } = req.params;
    const { comment } = req.body;

    const existPost = await Comment.findOne({ commentNum: Number(commentNum) }).exec();
    if (userId === existPost.userId) {
        await Comment.updateOne({ commentNum: Number(commentNum) }, { $set: { comment } });
        res.json({ success: true });
    } else {
        res.status(400).send({
            errorMassege: "내가 작성한 댓글만 수정 가능합니다."
        });
    }
});

// 댓글 삭제
router.delete("/comment/:commentNum", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { commentNum } = req.params;

    const existPost = await Comment.findOne({ commentNum: Number(commentNum) }).exec();
    if (userId === existPost.userId) {
        existPost.delete();
        res.json({ success: true });
    } else {
        res.status(400).send({
            errorMassege: "내가 작성한 댓글만 삭제 가능합니다."
        });
    }
});

module.exports = router;