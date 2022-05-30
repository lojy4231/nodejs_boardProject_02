const express = require('express');
const connect = require('./models'); // mongDB 연결

const authRouter = require('./routes/auth');
const app = express();
const port = 3000;

const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, '-', new Date());
    next();
};

connect();

app.use(express.json());
app.use(requestMiddleware);

app.use('/api', [authRouter]);

app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요")
});