// DEPENDENCIES //
const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

//Server Port
const port = 8000
app.listen(port)

//Server response to test OK
//Renders index.ejs file to localhost:port
app.get('/', (req, res) => {
    res.render('index')
})

//View engine will convert ejs code into html
app.set('view engine', 'ejs')