//Requirements

//MongoDB access
const mongoose = require('mongoose')

//library to create markdown and convert into HTML
const marked = require('marked')

//Library to create 'slugs' (version of title to use as url path)
const slug = require('slugify')


//Article 'blueprint' using mongoose Schema feature
const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

//Anytime anything is done to an article, if-conditional function runs using pre() parameter
//if there is an article title, slugify said article title
//give it properties of lowercase (lower) and any characters that dont fit into a url is removed (strict)
articleSchema.pre('validate', function(){
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    //Errors will popup without the next function
    next()
})

//Export this schema
//Reference in 'articles.js' requirements
module.exports = mongoose.model('Article', articleSchema)