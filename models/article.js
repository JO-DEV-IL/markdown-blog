//Requirements//

//MongoDB access
const mongoose = require('mongoose')

//library to create markdown and convert into HTML
const marked = require('marked')

//Library to create 'slugs' (version of title to use as url path)
const slugify = require('slugify')

//jsdom library needed for dompurify
//brackets means only return the JSDOM portion of everything jsdom library returns
const { JSDOM } = require('jsdom')
//Purifying html necessary for security purposes
//dompurify creates HTML and purifies it using .windows object

//below dompurify seems to be outdated?
// const createDomPurify = require('dompurify')
// const dompurify = createDomPurify(new JSDOM().windows)

// imported wrapper for dompurify to work seamlessly on client/server
const DOMPurify = require('isomorphic-dompurify')


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
    },
    sanitizedHtml: {
        type: String,
        required: true
    }
})

//Anytime anything is done to an article, if-conditional function runs using pre() parameter
//if there is an article title, slugify said article title
//give it properties of lowercase (lower) and any characters that dont fit into a url is removed (strict)
articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true })
    }

    //if a markdown exists, give it sanitizedHtml variable and run 'marked.parse(this.markdown)' through .sanitize()
    if(this.markdown) {
        this.sanitizedHtml = DOMPurify.sanitize(marked.parse(this.markdown))
    }
    
    //Errors will popup without the next function
    next()
})

//Export this schema
//Reference in 'articles.js' requirements
module.exports = mongoose.model('Article', articleSchema)