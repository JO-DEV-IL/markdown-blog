// This is where all the routes directly related to articles will go



// Requirements //
const express = require('express')

// Router will allow for the same functionality as app.get rendering
// Keeps routes clean and organized to prevent a large server.js file
// by giving them their own file
const router = express.Router()

// Exports router file to server.js dependencies
module.exports = router


// localhost:port/articles response
router.get('/', (req, res) => {
    res.send('In articles')
})