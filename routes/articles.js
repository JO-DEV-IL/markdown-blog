// This is where all the routes directly related to articles will go

// Requirements //
const express = require('express')
const Article = require('./../models/article')

// Router will allow for the same functionality as app.get rendering
// Keeps routes clean and organized to prevent a large server.js file
// by giving them their own file
const router = express.Router()

// localhost:port/articles/new
// pass in article parameter to ensure no 'article is undefined' errors
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article()})
})

//Saved article.id router (/:id)
//findById() is an async function
//With the slugify library, changed :id to :slug
//changed 'findById()' to 'findOne()'(for array) which is also async
//added slug: parameter to findOne()
router.get('/:slug', async (req, res) => {
    //variable to locate the article id
    const article = await Article.findOne({ slug: req.params.slug })
    
    //if there is no article, redirect user back to localhost:port/
    if(article == null) res.redirect('/')
    
    //renders article property w/id @ localhost:port/articles/show
    res.render('articles/show', { article: article })
})

//route to delete articles
//delete() is asyncrynous
//finds article id, runs delete() on that id, redirects to homepage
//findByIdAndDelete() is a method-override function
router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

//route to edit id of article
router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article})
})

//route to use PUT method (edit) on article id
router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    //next() means go on to next function in list which is saveArticleAndRedirect()
    next()
}, saveArticleAndRedirect('edit'))

// Linked to POST request in new.ejs
// Functionally similar to app.post
// Whenever form is submitted it will call on this response
// Response will be to save POST to MongoDB
// Linked to 'article.js' model
router.post('/', async (req, res, next) => {
    req.article = new Article()
    //next() means go on to next function in list which is saveArticleAndRedirect()
    next()
}, saveArticleAndRedirect('new'))


// express.urlencoded() in server.js allows data to pass through 'req.body'
// changed 'const' article to 'let' to allow reassignment during success
//former POST method, changed to separate function for edit purposes
function saveArticleAndRedirect(path){
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.description = req.body.description
        article.markdown = req.body.markdown
        try{
            //reasignment of article varibale to hold the saved article on success
            article = await article.save()
            //added .slug to article varible
            res.redirect(`/articles/${article.slug}`)
        }catch(error){
            res.render(`articles/${path}`, { article: article })
        }
    }
}
//save() is asyncrynous
//add 'async' to (req/res), add await to save()
//wrap save in a try/catch to catch errors
//on success it will redirect user to saved article's id
//on failure it will render localhost:port/articles/new with { article: article } proptery that user previously passed in

//Export router file to server.js dependencies
module.exports = router