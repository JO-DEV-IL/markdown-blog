// This is where all the routes directly related to articles will go

// Requirements //
const express = require('express')
const Article = require('./../models/article')

// Router will allow for the same functionality as app.get rendering
// Keeps routes clean and organized to prevent a large server.js file
// by giving them their own file
const router = express.Router()

// localhost:port/articles/new request/response
// pass in article parameter to ensure no 'article is undefined' errors
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article( )})
})

// Linked to POST request in new.ejs
// Functionally similar to app.post
// Whenever form is submitted it will call on this response
// Response will be to save POST to MongoDB
// Linked to 'article.js' model
// express.urlencoded() in server.js allows data to pass through 'req.body'
// changed 'const' article to 'let' to allow reassignment during success
router.post('/', async (req, res) => {
    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    })
    try{
        //reasignment of article varibale to hold the saved article on success
        article = await article.save()
        res.redirect(`/articles/${article.id}`)
    }catch(error){
        // console.log(error)
        res.render('articles/new', { article: article })
    }
    //save() is asyncrynous
    //add 'async' to (req/res), add await to save()
    //wrap save in a try/catch to catch errors
    //on success it will redirect user to saved article's id
    //on failure it will print errors render localhost:port/articles/new with { article: article } proptery that user previously passed in
})

//Saved article.id router
//findById() is an async function
router.get('/:id', async (req, res) => {
    //variable to locate the article id
    const article = await Article.findById(req.params.id)
    
    //if there is no article, redirect user back to localhost:port/
    if(article == null) res.redirect('/')
    
    //renders article property w/id @ localhost:port/articles/show
    res.render('articles/show', { article: article })
})

//Export router file to server.js dependencies
module.exports = router