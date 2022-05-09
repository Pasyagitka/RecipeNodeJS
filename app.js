const express = require('express');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const expressHbs = require('express-handlebars');
// const hbs = require('handlebars');
const { ValidationError } = require('express-validation');

require('dotenv').config();

const app = express();

app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/meals', mealsRouter);
app.use('/categories', categoriesRouter);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/recipeIngredients', recipeIngredientsRouter);
app.use('/cookbooks', cookbooksRouter);

app.use((req, res, next) => {
    res.status(404).render('error', {message: '404 Not found', isNoHeaderPage: true});
});
  
app.use((error, req, res, next) => { 
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json(error.details.body[0].message);
    }
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send(error.error);
});

module.exports = app;
