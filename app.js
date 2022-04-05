const express = require('express');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { ValidationError} = require('express-validator');
require('dotenv').config();


const app = express();

const start = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch(e) {
        console.log(e);
    }
}


app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}))
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

const authRouter = require('./src/routes/auth');
const ingredientsRouter = require('./src/routes/ingredients');
const mealsRouter = require('./src/routes/meals');
const categoriesRouter = require('./src/routes/categories');
const textFromFileRouter = require('./src/routes/textFromFile');

app.use('/auth', authRouter);
app.use('/meals', mealsRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/categories', categoriesRouter);
app.use('/textFromFile', textFromFileRouter);


app.use((error, req, res, next) => { 
    console.log(error);
    res.status(error.statusCode).send(error.error);
});



start();

module.exports = app;
