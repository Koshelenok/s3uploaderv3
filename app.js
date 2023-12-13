require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');

var indexRouter = require('./routes/index');

const app = express();
const server = http.createServer(app);
const port = process.env.APP_PORT;

app.use(cors());
app.use(express.json({limit: "25mb"}));
app.use(express.urlencoded({limit: "25mb"}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/', indexRouter);

server.listen(port, () => {
    console.log(`Express server started on port ${port}`);
});