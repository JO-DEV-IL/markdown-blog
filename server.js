// DEPENDENCIES //
const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')

//Server Port
const port = 8000
app.listen(port)

//Server response
app.get('/', (req, res) => {
    
    //Articles array
    const articles = [{
        title: 'Test Article',
        createdAt: new Date(), //Function to capture current date
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt: new Date(), //Function to capture current date
        description: 'Test description'
    },
    {
        title: 'Test Article 3',
        createdAt: new Date(), //Function to capture current date
        description: 'Test description'
    }]
    //Renders index.ejs in articles folder to localhost:port/
    //Renders articles object to index.ejs
    res.render('articles/index', { articles: articles })
})

//View engine will convert ejs code into html
app.set('view engine', 'ejs')

//Tells server to use articleRouter at localhost:port/articles
app.use('/articles', articleRouter)