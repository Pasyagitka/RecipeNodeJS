const express = require('express');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const expressWinston = require('express-winston');
const mongoose = require('mongoose');
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


// app.use(expressWinston.logger({
//     transports: [
//         new winston.transports.Console({
//             json: true,
//             colorize: true,
//         }),
//     ],
//     msg: 'HTTP {{req.method}} {{req.url}}',
//     expressFormat: true,
//     colorize: true,
// }));


app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


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


function errorResponder(error, req, res, next) { 
    console.log(error);
    res.status(error.status).send(error.message);
}
app.use(errorResponder);


start();

module.exports = app;
