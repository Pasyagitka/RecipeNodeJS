const express = require('express');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const hbs = require('handlebars');
// const hbs = require('handlebars');
const { ValidationError } = require('express-validation');
const { UnauthorizedError } = require('./helpers/errors/customError');


const pjax = require('express-pjax');


require('dotenv').config();

const app = express();

app.use(passport.initialize());

app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({ limit: "200mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(pjax());

// app.use(passport.initialize());
// require('./services/jwtStrategy');
// require('./services/facebookStrategy');
// require('./services/googleStrategy');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine("hbs", expressHbs.engine({
  layoutsDir: "views/layouts", 
  defaultLayout: "layout", 
  extname: "hbs",
  partialsDir: "views/partials/",
  helpers: {
      cancelbutton: function(url) {
          url = hbs.escapeExpression(url);
          return new hbs.SafeString("<a class='btn cancel-button' href='" + url + "'>Отмена</a>");
      }
  }
}))
app.set('view engine', 'hbs');

app.use(morgan('dev', {
    // skip: function (req, res) { return res.statusCode < 400 }
}))
  
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
}))

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const mealsRouter = require('./routes/meals');
const categoriesRouter = require('./routes/categories');
const recipesRouter = require('./routes/recipes');
const ingredientsRouter = require('./routes/ingredients');
const recipeIngredientsRouter = require('./routes/recipeIngredients');
const cookbooksRouter = require('./routes/cookbooks');
const adminRouter = require('./routes/admin');
const userRecipesRouter = require('./routes/userRecipes');


app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/meals', mealsRouter);
app.use('/categories', categoriesRouter);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/recipeIngredients', recipeIngredientsRouter);
app.use('/cookbooks', cookbooksRouter);
app.use('/admin', adminRouter);
app.use('/userrecipes', userRecipesRouter);


app.use((req, res, next) => {
    res.status(404).render('error', {message: '404 Not found', isNoHeaderPage: true});
});
  
app.use((error, req, res, next) => { 
    console.log('!!!!!!', error);
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json(error.details.body[0].message);
    }
    if (error instanceof UnauthorizedError) {
        return res.render('error').json(error.details.body[0].message);
    }
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).json(error.error);
});

const connectMongo = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch(e) {
        console.log(e);
    }
}
connectMongo();

module.exports = app;
