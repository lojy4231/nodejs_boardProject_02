require("dotenv").config();
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = require("../middlewares/auth-middleware");


const userSchema = Joi.object({
    nickname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
    confiemPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
});


// 회원가입
router.post("/users", async (req, res) => {
    try {
        const { nickname, password, confiemPassword } = await userSchema.validateAsync(req.body);

        if (password !== confiemPassword) {
            res.status(400).send({
                errorMessage: "패스워드가 일치 하지 않습니다.",
            });
            return;
        }

        const exisUsers = await User.find({ nickname });
        if (exisUsers.length) {
            res.status(400).send({
                errorMessage: " 이미 가입된 닉네임 입니다.",
            });
            return
        }

        const user = new User({ nickname, password });
        await user.save();

        res.status(201).send({});
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});


// 로그인

const authSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
});
router.post("/auth", async (req, res) => {
    try {
        const { email, password } = await authSchema.validateAsync(req.body);

        const user = await User.findOne({ email, password }).exec();

        if (!user) {
            res.status(400).send({
                errorMessage: " 이메일 또는 비밀번호가 잘못됐습니다."
            });
            return;
        }

        const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET_KEY);
        res.send({
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(400).send({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
        });
    }
});

router.get("/users/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.status(400).send({
        user,
    });
});

module.exports = router;