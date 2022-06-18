const express = require('express');
const mongoose = require('mongoose');
const port = 8080;
const cors = require('cors');
const userRouter = require("./routes/user");
const likeRouter = require("./routes/like");
const marketRouter = require("./routes/market");


// mongoose.connect('mongodb://0.0.0.0/cloneporject', {
mongoose.connect("mongodb+srv://test:sparta@cluster0.l2ux3.mongodb.net/THUNDERMARKET", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', express.urlencoded({ extended: false }),[userRouter,likeRouter, marketRouter]);

app.use('/', (req, res) =>{
    res.send('클론코딩 테스트 페이지')
});


app.listen(port, () => {
    console.log(port, '포트로 서버가 켜졌어요!')
});