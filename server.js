// DEPENDENCIES //
const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')

//MongoDB connection using mongoose
mongoose.connect('mongodb://127.0.0.1/blog')
// {
//   useNewUrlParser: true, useUnifiedTopology: true
// })

//View engine will convert ejs code into html
app.set('view engine', 'ejs')

//Tells server to access all parameters inside New Article form using 'req.body'
//i.e. accessing data in an API ('data.title', 'data.data[0].image', etc.)
//Anything that needs this feature will have to come AFTER this line of code
//i.e 'app use /articles' articleRouter
app.use(express.urlencoded({ extended: false }))

//Server request/response
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

//'app use /articles' has to come after urlencoded, or the req.body can't be read properly 
//Tells server to use articleRouter at localhost:port/articles
app.use('/articles', articleRouter)

//Server Port
const port = 8000
app.listen(port, () => {
    console.log(`Server successfully running on port ${port}!`)
})
