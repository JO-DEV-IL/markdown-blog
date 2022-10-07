// DEPENDENCIES //
const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')

//MongoDB connection using mongoose
//run mongodb://127.0.0.1:27017/blog into mongosh
mongoose.connect('mongodb://127.0.0.1:27017/blog')

//View engine will convert ejs code into html
app.set('view engine', 'ejs')

//Tells server to access all parameters inside New Article form using 'req.body'
//i.e. accessing data in an API ('data.title', 'data.data[0].image', etc.)
//Anything that needs this feature will have to come AFTER this line of code
//i.e 'app use /articles' articleRouter
app.use(express.urlencoded({ extended: false }))

//Server request/response
//find() is async
app.get('/', async (req, res) => {
    //variable to find articles that have been created and sort them based on when they were created (createdAt) in descending ('desc') order
    const articles = await Article.find().sort({ createdAt: 'desc' })
    //Renders index.ejs in articles folder to localhost:port/
    //Renders articles to index.ejs
    res.render('articles/index', { articles: articles })
})

//'app use /articles' has to come after urlencoded, or the req.body can't be read properly 
//Tells server to use articleRouter at localhost:port/articles
app.use('/articles', articleRouter)

//Server Port
const port = 8000
app.listen(port, () => {
    console.log(`Server successfully running on port ${port}!`)
})
