require("dotenv").config();
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const authMiddleware = require("../middlewares/auth-middleware");


const userSchema = Joi.object({
    nickname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
    confiemPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
});


// 회원가입
router.post("/signup", async (req, res) => {
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

        if (nickname === password){
            res.status(400).send({
                errorMessage: " 닉네임과 비밀번호는 같을 수 없습니다.",
            });
            return
        };

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
    nickname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{4,30}$')).required(),
});
router.post("/signin", async (req, res) => {
    try {
        const { nickname, password } = await authSchema.validateAsync(req.body);
        
        const user = await User.findOne({ nickname }).exec();
        const isSamePassword = await bcrypt.compare(password, user.password);

        if (!isSamePassword) {
                res.status(400).send({
                    errorMessage: " 닉네임 또는 비밀번호가 잘못됐습니다."
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

router.get("/signin/me", authMiddleware, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user: {
            nickname: user.nickname
        },
    });
});

module.exports = router;