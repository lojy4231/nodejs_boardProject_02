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

    const posts = await Post.find({ date }).sort({ date: -1 }).exec();

    res.json({
        posts,
    });
});


// 게시글 상세 조회
router.get("/post/:postId", async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).exec();
    if (!post){
        res.status(400).send({});
    } else{
        res.send({ post });
    }
    
});


// 게시글 삭제
router.delete("/post/:postId", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;

    const deletePost = await Post.findOne({ userId, postId }).exec();
    if (deletePost) {
        deletePost.delete();
    }
    res.json({ success: true });
});

// 게시글 수정
router.put("/post/:postId", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { postId } = req.params;
    const { title } = req.body;
    const { content } = req.body;

    const existPost = await Post.findOne({ userId, postId }).exec();
    if (existPost) {
        await existPost.updateOne( {}, { $set: { title, content } });
    }
    res.send({ existPost });
});


// 게시글 작성
router.post("/post", authMiddleware, async (req, res) => {
    const { userId } = res.locals.user;
    const { title, date, content } = req.body;


    const post = new Post({ userId, title, date, content });
    await post.save();

    res.send({ post });
});

module.exports = router;