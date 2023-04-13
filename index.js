
require('dotenv').config()
const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");

const bodyParser = require('body-parser')
const app = express();
app.use(express.urlencoded({ extended: false }));

// SET OUR VIEWS AND VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    cookieSession({
        name: "session",
        keys: ["key1", "key2"],
        maxAge: 3600 * 1000, // 1hr
    })
);
// set the view engine to ejs
app.set('view engine', 'ejs')
// set root folder for views
app.set('views', path.join(__dirname, 'views'))

// Statics
app.use( express.static(path.join(__dirname, 'static')))


// Encode body
app.use(bodyParser.urlencoded({ extended: false}));


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


const indexRouter = require('./routes/index')
const formRouter = require('./routes/form')
const logregRouter = require('./routes/logreg')
app.use(indexRouter.router)
app.use(formRouter.router)
app.use(logregRouter.router)
app.get('/', (req,res)=>{
    res.render('test')
})

app.listen(3000, ()=>{
    console.log(`http://localhost:3000`);
})