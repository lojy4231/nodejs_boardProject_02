const express = require('express');
const connect = require('./models'); // mongDB 연결

const app = express();
const port = 3000;

connect();

app.use(express.json());


app.listen(port, () => {
    console.log(port, "포트로 서버가 켜졌어요")
});