// DEPENDENCIES //
const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

//Server Port
const port = 8000
app.listen(port)

//Server response
//Renders index.ejs file to localhost:port/
app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt: Date.now(), //Data.now() is a function that tracks the exact time
        description: 'Test description'
    }]
    res.render('index', { articles: "Hello" })
})

//View engine will convert ejs code into html
app.set('view engine', 'ejs')

//Tells server to use articleRouter at localhost:port/articles
app.use('/articles', articleRouter)