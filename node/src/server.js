require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/userRouter');
const dataRouter = require('./routes/dataRouter');
// const projectRouter = require("./routes/projectRouter");

const port = process.env.PORT ? process.env.PORT : 4000;

mongoose.connect(process.env.MONGOOSE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('DB connected successfully!');
});
db.on('error', (err) => {
    console.error(`Error while connecting to DB: ${err.message}`);
});

const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: '*',
    })
);

app.use('/api/user/', userRouter);
app.use('/api/data/', dataRouter);
// app.use("/api/project/", projectRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
    console.log(process.env.MONGOOSE)
});

module.exports = { app };
