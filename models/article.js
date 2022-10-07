//Requirements
const mongoose = require('mongoose')


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