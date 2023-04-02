const express = require('express')
const path = require("path");
const app = express()
const bodyParser = require('body-parser')

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

app.use(indexRouter.router)
app.get('/', (req,res)=>{
    res.render('test')
})

app.listen(3000, ()=>{
    console.log(`http://localhost:3000`);
})