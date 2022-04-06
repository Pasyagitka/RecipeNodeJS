const express = require('express');
const fs = require('fs');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { ValidationError } = require('express-validation');

require('dotenv').config();


const app = express();


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
const mealsRouter = require('./src/routes/meals');
const categoriesRouter = require('./src/routes/categories');
const recipesRouter = require('./src/routes/recipes');
const ingredientsRouter = require('./src/routes/ingredients');
const recipeIngredientsRouter = require('./src/routes/recipeIngredients');
const cookbooksRouter = require('./src/routes/cookbooks');
const textFromFileRouter = require('./src/routes/textFromFile');

app.use('/auth', authRouter);
app.use('/meals', mealsRouter);
app.use('/categories', categoriesRouter);
app.use('/recipes', recipesRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/recipeIngredients', recipeIngredientsRouter);
app.use('/cookbooks', cookbooksRouter);
app.use('/textFromFile', textFromFileRouter);

app.use((req, res, next) => {
    res.status(404).send("404: Not found");
});
  
app.use((error, req, res, next) => { 
    if (error instanceof ValidationError) {
        return res.status(error.statusCode).json(error.details.body[0].message);
    }
    if (!error.statusCode) error.statusCode = 500;
    res.status(error.statusCode).send(error.error);
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
