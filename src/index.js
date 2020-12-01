const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const setCors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("X-Requested-With", "XMLHttpRequest");
    app.use(cors());
    next();
}

app.use(setCors);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(routes);

app.use(express.json());

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.listen(3003);
