// DEPENDENCIES //
const express = require('express')
const app = express()
const articleRouter = require('./routes/articles')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')

//MongoDB connection using mongoose
mongoose.connect(
    `mongodb+srv://jo-dev-il:admin@cluster0.pemhl1o.mongodb.net/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
})

//View engine will convert ejs code into html
app.set('view engine', 'ejs')

//Tells server to access all parameters inside New Article form using 'req.body'
//i.e. accessing data in an API ('data.title', 'data.data[0].image', etc.)
//Anything that needs this feature will have to come AFTER this line of code
//i.e 'app use /articles' articleRouter
app.use(express.urlencoded({ extended: false }))

//Method override library allows for DELETE as a method
//Can be used to override whatever method the form passes(GET/POST)
//Easier way to create delete buttons
app.use(methodOverride('_method'))

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

//External css stylesheet
app.use(express.static(__dirname + '/public'))

//Server Port
const port = 8000
app.listen(port, () => {
    console.log(`Server successfully running on port ${port}!`)
})
