//Requirements

//MongoDB access
const mongoose = require('mongoose')

//create markdown and convert into HTML
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
    }
})

//Export this schema
//Reference in 'articles.js' requirements
module.exports = mongoose.model('Article', articleSchema)