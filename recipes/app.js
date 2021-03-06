const express = require('express');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const hbs = require('handlebars');
const { ValidationError } = require('express-validation');
const {HostNotFoundError} = require('sequelize');
const { UnauthorizedError, BadResetPasswordLinkError } = require('./helpers/errors/customError');
require('dotenv').config();

const app = express();

app.use(passport.initialize());

app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({ limit: "200mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", expressHbs.engine({
  layoutsDir: "views/layouts", 
  defaultLayout: "layout", 
  extname: "hbs",
  partialsDir: "views/partials/",
}))
app.set('view engine', 'hbs');

app.use(morgan('dev', {
    // skip: function (req, res) { return res.statusCode < 400 }
}))
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/meals', require('./routes/meals'));
app.use('/categories', require('./routes/categories'));
app.use('/recipes', require('./routes/recipes'));
app.use('/ingredients', require('./routes/ingredients'));
app.use('/cookbooks', require('./routes/cookbooks'));
app.use('/admin', require('./routes/admin'));
app.use('/userrecipes', require('./routes/userRecipes'));


app.use((req, res, next) => {
    res.status(404).render('error', {message: '404 Not found', isNoHeaderPage: true});
});
  
//TODO mongo error handling
const connectMongo = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch(e) {
        throw e
        console.log(e);
    }
}
//connectMongo();

app.use((error, req, res, next) => { 
    console.log('!!!!!!', error);
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json(error.details.body[0].message);
    }
    if (error instanceof BadResetPasswordLinkError) {
       return res.render('error', {statusCode: error.statusCode, message: error.error, isNoHeaderPage: true},)
    }
    if (error instanceof HostNotFoundError) {
        console.log(error)
        return res.render('error', {statusCode: '500', message: 'Turn on the Internet!', isNoHeaderPage: true},)
    }
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).json(error.error);
});

module.exports = app;
