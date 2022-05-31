const express = require("express");
const Post = require("../models/post");
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");

router.get("/", (req, res) => {
    res.send("this is post page")
});


// 게시글 조회 (최신 날짜 순으로)
router.get("/post", async (req, res) => {
    const { date } = req.query;

    const posts = await Post.find({ }).sort({ date: -1 }).exec();

    res.json({
        posts,
    });
});

// 게시글 상세 조회
router.get("/post/:postNum", async (req, res) => {
    const { postNum } = req.params;

    const post = await Post.find({ postNum: Number(postNum) }).exec();
    if (!post) {
        res.status(400).send({});
    } else {
        res.json({ post });
    }

});

// 게시글 삭제
router.delete("/post/:postNum", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { postNum } = req.params;

    const deletePost = await Post.findOne({ userId, postNum: Number(postNum) }).exec();
    if (deletePost) {
        deletePost.delete();
    } else {
        res.status(400).send({
            errorMassege: "내가 쓴 글만 삭제 가능 합니다."
        });
    }
    res.json({ success: true });
});

// 게시글 수정
router.put("/post/:postNum", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { postNum } = req.params;
    const { title, content } = req.body;

    const existPost = await Post.findOne({ userId, postNum: Number(postNum) }).exec();
    if (existPost) {
        await Post.updateOne({ postNum: Number(postNum) }, { $set: { title, content } });
    } else {
        res.status(400).send({
            errorMassege: "내가 쓴 글만 수정 가능 합니다."
        });
    }
    res.json({ success: true });
});

// 게시글 작성
router.post("/post", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { title, date, content } = req.body;
    
    const maxPostNum = await Post.findOne().sort("-postNum").exec();
    let postNum = 10001;

    if (maxPostNum) {
        postNum = maxPostNum.postNum +1;
    }

    const post = new Post({ postNum, userId, title, date, content });
    await post.save();

    res.send({ post });
});

module.exports = router;